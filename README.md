# Music Licensing Workflow

Backend-only implementation using NestJS + PostgreSQL with Redis-backed realtime updates.

## Tech Choices
- Backend: NestJS (REST)
- Database: PostgreSQL (Prisma)
- Realtime: Server-Sent Events (SSE) + Redis pub/sub
- Containerization: Docker Compose (Postgres + Redis)

## Setup

1) Start Postgres + Redis
```
docker compose up -d
```

2) Install backend deps
```
cd backend
npm install
```

3) Configure env
```
copy .env.example .env
```

4) Run migrations
```
npx prisma migrate dev --name init
```

5) Run the API
```
npm run start:dev
```

API runs at `http://localhost:3000/api`.

## API Summary

Movies
- `POST /api/movies`
- `GET /api/movies`
- `GET /api/movies/:movieId`
- `GET /api/movies/:movieId/tracks`

Scenes
- `POST /api/movies/:movieId/scenes`
- `GET /api/movies/:movieId/scenes`

Songs
- `POST /api/songs`
- `GET /api/songs`

Tracks
- `POST /api/scenes/:sceneId/tracks`
- `GET /api/scenes/:sceneId/tracks`
- `GET /api/tracks/:trackId/licensing-events`

Licensing
- `PATCH /api/tracks/:trackId/licensing-status`

Realtime (SSE)
- `GET /api/events`

## Realtime Updates

Licensing status updates are published via Redis pub/sub and streamed over SSE.

Frontend usage example:
```ts
const source = new EventSource("/api/events");
source.addEventListener("licensing.status.updated", (event) => {
  const payload = JSON.parse(event.data);
  // update UI
});
```

## Notes
- Validation is enforced globally via NestJS `ValidationPipe`.
- `POST /api/scenes/:sceneId/tracks` accepts either `songId` or inline `song` details.

