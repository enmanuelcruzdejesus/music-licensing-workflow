import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { TracksService } from "./tracks.service";

@Controller("tracks")
export class TracksEventsController {
  constructor(private readonly tracksService: TracksService) {}

  @Get(":trackId/licensing-events")
  findLicensingEvents(
    @Param("trackId", new ParseUUIDPipe({ version: "4" })) trackId: string,
  ) {
    return this.tracksService.findLicensingEvents(trackId);
  }
}
