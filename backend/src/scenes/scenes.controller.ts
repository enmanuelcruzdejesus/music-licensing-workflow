import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { PaginationDto } from "../common/dto/pagination.dto";
import { ScenesService } from "./scenes.service";
import { CreateSceneDto } from "./dto/create-scene.dto";

@Controller("movies/:movieId/scenes")
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) {}

  @Post()
  create(
    @Param("movieId", new ParseUUIDPipe({ version: "4" })) movieId: string,
    @Body() payload: CreateSceneDto,
  ) {
    return this.scenesService.create(movieId, payload);
  }

  @Get()
  findByMovie(
    @Param("movieId", new ParseUUIDPipe({ version: "4" })) movieId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.scenesService.findByMovie(movieId, pagination);
  }
}
