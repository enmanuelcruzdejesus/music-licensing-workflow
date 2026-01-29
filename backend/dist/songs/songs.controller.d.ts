import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateSongDto } from "./dto/create-song.dto";
import { SongsService } from "./songs.service";
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    create(payload: CreateSongDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        artist: string;
        isrc: string | null;
        durationMs: number | null;
    }>;
    findAll(pagination: PaginationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        artist: string;
        isrc: string | null;
        durationMs: number | null;
    }[]>;
}
