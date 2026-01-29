import { PaginationDto } from "../common/dto/pagination.dto";
import { PrismaService } from "../database/prisma.service";
import { CreateTrackDto } from "./dto/create-track.dto";
export declare class TracksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findByScene(sceneId: string, pagination?: PaginationDto): Promise<({
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
