import { PaginationDto } from "../common/dto/pagination.dto";
import { TracksService } from "./tracks.service";
import { CreateTrackDto } from "./dto/create-track.dto";
export declare class TracksController {
    private readonly tracksService;
    constructor(tracksService: TracksService);
    create(sceneId: string, payload: CreateTrackDto): Promise<{
        song: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            artist: string;
            isrc: string | null;
            durationMs: number | null;
        };
    } & {
        id: string;
        sceneId: string;
        songId: string;
        startMs: number;
        endMs: number;
        licensingStatus: import(".prisma/client").$Enums.LicensingStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByScene(sceneId: string, pagination: PaginationDto): Promise<({
        song: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            artist: string;
            isrc: string | null;
            durationMs: number | null;
        };
    } & {
        id: string;
        sceneId: string;
        songId: string;
        startMs: number;
        endMs: number;
        licensingStatus: import(".prisma/client").$Enums.LicensingStatus;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
