import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { MoviesService } from "./movies.service";
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    create(payload: CreateMovieDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        releaseAt: Date | null;
    }>;
    findAll(pagination: PaginationDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        releaseAt: Date | null;
    }[]>;
    findOne(movieId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        releaseAt: Date | null;
    }>;
    findTracks(movieId: string, pagination: PaginationDto): Promise<({
        scene: {
            id: string;
            startMs: number;
            endMs: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            movieId: string;
            orderIndex: number;
        };
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
