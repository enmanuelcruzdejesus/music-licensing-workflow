import { PaginationDto } from "../common/dto/pagination.dto";
import { PrismaService } from "../database/prisma.service";
import { CreateSongDto } from "./dto/create-song.dto";
export declare class SongsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(payload: CreateSongDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        artist: string;
        isrc: string | null;
        durationMs: number | null;
    }>;
    findAll(pagination?: PaginationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        artist: string;
        isrc: string | null;
        durationMs: number | null;
    }[]>;
}
