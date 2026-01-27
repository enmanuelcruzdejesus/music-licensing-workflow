import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { PaginationDto } from "../common/dto/pagination.dto";
import { TracksService } from "./tracks.service";
import { CreateTrackDto } from "./dto/create-track.dto";

@Controller("scenes/:sceneId/tracks")
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(
    @Param("sceneId", new ParseUUIDPipe({ version: "4" })) sceneId: string,
    @Body() payload: CreateTrackDto,
  ) {
    return this.tracksService.create(sceneId, payload);
  }

  @Get()
  findByScene(
    @Param("sceneId", new ParseUUIDPipe({ version: "4" })) sceneId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.tracksService.findByScene(sceneId, pagination);
  }
}
