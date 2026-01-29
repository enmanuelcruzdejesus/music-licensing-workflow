import { Response } from "express";
import { RealtimeService } from "./realtime.service";
export declare class RealtimeController {
    private readonly realtimeService;
    constructor(realtimeService: RealtimeService);
    stream(response: Response): void;
}
