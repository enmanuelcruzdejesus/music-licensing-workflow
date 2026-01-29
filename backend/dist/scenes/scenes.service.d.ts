import { PaginationDto } from "../common/dto/pagination.dto";
import { PrismaService } from "../database/prisma.service";
import { CreateSceneDto } from "./dto/create-scene.dto";
export declare class ScenesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(movieId: string, payload: CreateSceneDto): Promise<{
        id: string;
        startMs: number;
        endMs: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        movieId: string;
        orderIndex: number;
    }>;
    findByMovie(movieId: string, pagination?: PaginationDto): Promise<{
        id: string;
        startMs: number;
        endMs: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        movieId: string;
        orderIndex: number;
    }[]>;
}
