import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { RealtimeService } from "./realtime.service";

@Controller("events")
export class RealtimeController {
  constructor(private readonly realtimeService: RealtimeService) {}

  @Get()
  stream(@Res() response: Response) {
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Connection", "keep-alive");
    response.flushHeaders();

    const unsubscribe = this.realtimeService.subscribe((message) => {
      const data = JSON.stringify(message.data);
      response.write(`event: ${message.event}\n`);
      response.write(`data: ${data}\n\n`);
    });

    response.on("close", () => {
      unsubscribe();
      response.end();
    });
  }
}
