import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateTrackDto } from "./dto/create-track.dto";

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(sceneId: string, payload: CreateTrackDto) {
    const scene = await this.prisma.scene.findUnique({ where: { id: sceneId } });

    if (!scene) {
      throw new NotFoundException("Scene not found");
    }

    if (!payload.songId && !payload.song) {
      throw new BadRequestException("Provide either songId or song details");
    }

    if (payload.songId && payload.song) {
      throw new BadRequestException("Provide only one of songId or song");
    }

    const songId =
      payload.songId ??
      (
        await this.prisma.song.create({
          data: {
            title: payload.song?.title ?? "",
            artist: payload.song?.artist ?? "",
            isrc: payload.song?.isrc,
            durationMs: payload.song?.durationMs,
          },
        })
      ).id;

    return this.prisma.track.create({
      data: {
        sceneId,
        songId,
        startMs: payload.startMs,
        endMs: payload.endMs,
      },
      include: {
        song: true,
      },
    });
  }

  async findByScene(sceneId: string, pagination?: PaginationDto) {
    return this.prisma.track.findMany({
      where: { sceneId },
      skip: pagination?.offset,
      take: pagination?.limit,
      orderBy: { createdAt: "desc" },
      include: {
        song: true,
      },
    });
  }
}
