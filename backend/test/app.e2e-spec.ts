import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/database/prisma.service";

const loadEnvIfNeeded = () => {
  if (process.env.DATABASE_URL) {
    return;
  }

  const envCandidates = [join(__dirname, "..", ".env"), join(__dirname, "..", ".env.example")];
  const envPath = envCandidates.find((candidate) => existsSync(candidate));

  if (!envPath) {
    return;
  }

  const content = readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = trimmed.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) {
      continue;
    }

    const key = match[1];
    let value = match[2];
    if (value.startsWith("\"") && value.endsWith("\"")) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
};

describe("Music Licensing API (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let movieId = "";
  let sceneId = "";
  let songId = "";
  let trackId = "";

  beforeAll(async () => {
    jest.setTimeout(30000);
    process.env.NODE_ENV = "test";
    loadEnvIfNeeded();
    process.env.REDIS_URL = "";

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required for e2e tests.");
    }

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix("api");
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    await app.init();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    if (trackId) {
      await prisma.licensingEvent.deleteMany({ where: { trackId } });
      await prisma.track.deleteMany({ where: { id: trackId } });
    }

    if (sceneId) {
      await prisma.scene.deleteMany({ where: { id: sceneId } });
    }

    if (movieId) {
      await prisma.movie.deleteMany({ where: { id: movieId } });
    }

    if (songId) {
      await prisma.song.deleteMany({ where: { id: songId } });
    }

    await app.close();
  });

  it("runs the primary workflow", async () => {
    const movieResponse = await request(app.getHttpServer())
      .post("/api/movies")
      .send({ title: "E2E Movie", releaseAt: "2025-01-01" })
      .expect(201);

    movieId = movieResponse.body.id;
    expect(movieId).toBeDefined();

    await request(app.getHttpServer()).get("/api/movies").expect(200);

    await request(app.getHttpServer()).get(`/api/movies/${movieId}`).expect(200);

    const sceneResponse = await request(app.getHttpServer())
      .post(`/api/movies/${movieId}/scenes`)
      .send({ name: "Opening", orderIndex: 0, startMs: 0, endMs: 30000 })
      .expect(201);

    sceneId = sceneResponse.body.id;
    expect(sceneId).toBeDefined();

    await request(app.getHttpServer()).get(`/api/movies/${movieId}/scenes`).expect(200);

    const songResponse = await request(app.getHttpServer())
      .post("/api/songs")
      .send({ title: "E2E Song", artist: "E2E Artist", durationMs: 180000 })
      .expect(201);

    songId = songResponse.body.id;
    expect(songId).toBeDefined();

    await request(app.getHttpServer()).get("/api/songs").expect(200);

    const trackResponse = await request(app.getHttpServer())
      .post(`/api/scenes/${sceneId}/tracks`)
      .send({ songId, startMs: 5000, endMs: 20000, note: "Initial placement" })
      .expect(201);

    trackId = trackResponse.body.id;
    expect(trackId).toBeDefined();

    await request(app.getHttpServer()).get(`/api/scenes/${sceneId}/tracks`).expect(200);

    const licensingResponse = await request(app.getHttpServer())
      .patch(`/api/tracks/${trackId}/licensing-status`)
      .send({ status: "REQUESTED", note: "Submitted", actor: "e2e" })
      .expect(200);

    expect(licensingResponse.body.licensingStatus).toBe("REQUESTED");

    const eventsResponse = await request(app.getHttpServer())
      .get(`/api/tracks/${trackId}/licensing-events`)
      .expect(200);

    const requestedEvent = eventsResponse.body.find(
      (event: { toStatus?: string }) => event.toStatus === "REQUESTED",
    );
    expect(requestedEvent).toBeDefined();

    await request(app.getHttpServer()).get(`/api/movies/${movieId}/tracks`).expect(200);
  });
});
