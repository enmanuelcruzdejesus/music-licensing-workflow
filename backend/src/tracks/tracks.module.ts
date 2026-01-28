import { Module } from "@nestjs/common";
import { TracksController } from "./tracks.controller";
import { TracksEventsController } from "./tracks-events.controller";
import { TracksService } from "./tracks.service";

@Module({
  controllers: [TracksController, TracksEventsController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
