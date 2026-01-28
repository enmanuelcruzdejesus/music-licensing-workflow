import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PaginationDto } from "../common/dto/pagination.dto";
import { LicensingStatus } from "../common/enums/licensing-status.enum";
import { PrismaService } from "../database/prisma.service";
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

    return this.prisma.$transaction(async (tx) => {
      let songId: string;

      if (payload.songId) {
        const song = await tx.song.findUnique({ where: { id: payload.songId } });

        if (!song) {
          throw new NotFoundException("Song not found");
        }

        songId = song.id;
      } else {
        const song = await tx.song.create({
          data: {
            title: payload.song!.title,
            artist: payload.song!.artist,
            isrc: payload.song!.isrc,
            durationMs: payload.song!.durationMs,
          },
        });

        songId = song.id;
      }

      const track = await tx.track.create({
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

      if (payload.note) {
        await tx.licensingEvent.create({
          data: {
            trackId: track.id,
            fromStatus: LicensingStatus.DRAFT,
            toStatus: LicensingStatus.DRAFT,
            note: payload.note,
          },
        });
      }

      return track;
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

  async findLicensingEvents(trackId: string) {
    const track = await this.prisma.track.findUnique({ where: { id: trackId } });

    if (!track) {
      throw new NotFoundException("Track not found");
    }

    return this.prisma.licensingEvent.findMany({
      where: { trackId },
      orderBy: { createdAt: "asc" },
    });
  }
}
