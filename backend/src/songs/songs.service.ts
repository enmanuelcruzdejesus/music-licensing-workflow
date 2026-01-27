import { Injectable } from "@nestjs/common";
import { PaginationDto } from "../common/dto/pagination.dto";
import { PrismaService } from "../database/prisma.service";
import { CreateSongDto } from "./dto/create-song.dto";

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateSongDto) {
    return this.prisma.song.create({
      data: {
        title: payload.title,
        artist: payload.artist,
        isrc: payload.isrc,
        durationMs: payload.durationMs,
      },
    });
  }

  async findAll(pagination?: PaginationDto) {
    return this.prisma.song.findMany({
      skip: pagination?.offset,
      take: pagination?.limit,
      orderBy: { createdAt: "desc" },
    });
  }
}
