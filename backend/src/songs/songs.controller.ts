import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateSongDto } from "./dto/create-song.dto";
import { SongsService } from "./songs.service";

@Controller("songs")
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() payload: CreateSongDto) {
    return this.songsService.create(payload);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.songsService.findAll(pagination);
  }
}
