import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() payload: CreateMovieDto) {
    return this.moviesService.create(payload);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.moviesService.findAll(pagination);
  }

  @Get(":movieId")
  findOne(@Param("movieId", new ParseUUIDPipe({ version: "4" })) movieId: string) {
    return this.moviesService.findOne(movieId);
  }

  @Get(":movieId/tracks")
  findTracks(
    @Param("movieId", new ParseUUIDPipe({ version: "4" })) movieId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.moviesService.findTracks(movieId, pagination);
  }
}
