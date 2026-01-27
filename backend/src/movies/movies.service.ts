import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateMovieDto) {
    return this.prisma.movie.create({
      data: {
        title: payload.title,
        releaseAt: payload.releaseAt ? new Date(payload.releaseAt) : undefined,
      },
    });
  }

  async findAll(pagination?: PaginationDto) {
    return this.prisma.movie.findMany({
      skip: pagination?.offset,
      take: pagination?.limit,
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const movie = await this.prisma.movie.findUnique({ where: { id } });

    if (!movie) {
      throw new NotFoundException("Movie not found");
    }

    return movie;
  }
}
