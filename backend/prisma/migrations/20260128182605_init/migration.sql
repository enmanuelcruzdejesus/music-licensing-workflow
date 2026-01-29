-- CreateEnum
CREATE TYPE "LicensingStatus" AS ENUM ('DRAFT', 'REQUESTED', 'NEGOTIATING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Movie" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "releaseAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scene" (
    "id" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "isrc" TEXT,
    "durationMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" UUID NOT NULL,
    "sceneId" UUID NOT NULL,
    "songId" UUID NOT NULL,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    "licensingStatus" "LicensingStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicensingEvent" (
    "id" UUID NOT NULL,
    "trackId" UUID NOT NULL,
    "fromStatus" "LicensingStatus" NOT NULL,
    "toStatus" "LicensingStatus" NOT NULL,
    "note" TEXT,
    "actor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LicensingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Scene_movieId_idx" ON "Scene"("movieId");

-- CreateIndex
CREATE INDEX "Track_sceneId_idx" ON "Track"("sceneId");

-- CreateIndex
CREATE INDEX "Track_songId_idx" ON "Track"("songId");

-- CreateIndex
CREATE INDEX "Track_licensingStatus_idx" ON "Track"("licensingStatus");

-- CreateIndex
CREATE INDEX "LicensingEvent_trackId_idx" ON "LicensingEvent"("trackId");

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicensingEvent" ADD CONSTRAINT "LicensingEvent_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
