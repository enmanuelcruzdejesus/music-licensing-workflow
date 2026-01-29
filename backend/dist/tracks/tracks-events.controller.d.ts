import { TracksService } from "./tracks.service";
export declare class TracksEventsController {
    private readonly tracksService;
    constructor(tracksService: TracksService);
    findLicensingEvents(trackId: string): Promise<{
        note: string | null;
        actor: string | null;
        id: string;
        createdAt: Date;
        fromStatus: import(".prisma/client").$Enums.LicensingStatus;
        toStatus: import(".prisma/client").$Enums.LicensingStatus;
        trackId: string;
    }[]>;
}
