import { Injectable, NotFoundException } from "@nestjs/common";
import { PaginationDto } from "../common/dto/pagination.dto";
import { PrismaService } from "../database/prisma.service";
import { CreateSceneDto } from "./dto/create-scene.dto";

@Injectable()
export class ScenesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(movieId: string, payload: CreateSceneDto) {
    const movie = await this.prisma.movie.findUnique({ where: { id: movieId } });

    if (!movie) {
      throw new NotFoundException("Movie not found");
    }

    return this.prisma.scene.create({
      data: {
        movieId,
        name: payload.name,
        orderIndex: payload.orderIndex,
        startMs: payload.startMs,
        endMs: payload.endMs,
      },
    });
  }

  async findByMovie(movieId: string, pagination?: PaginationDto) {
    return this.prisma.scene.findMany({
      where: { movieId },
      skip: pagination?.offset,
      take: pagination?.limit,
      orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
    });
  }
}
