"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let MoviesService = class MoviesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(payload) {
        return this.prisma.movie.create({
            data: {
                title: payload.title,
                releaseAt: payload.releaseAt ? new Date(payload.releaseAt) : undefined,
            },
        });
    }
    async findAll(pagination) {
        return this.prisma.movie.findMany({
            skip: pagination?.offset,
            take: pagination?.limit,
            orderBy: { createdAt: "desc" },
        });
    }
    async findOne(id) {
        const movie = await this.prisma.movie.findUnique({ where: { id } });
        if (!movie) {
            throw new common_1.NotFoundException("Movie not found");
        }
        return movie;
    }
    async findTracks(movieId, pagination) {
        const movie = await this.prisma.movie.findUnique({ where: { id: movieId } });
        if (!movie) {
            throw new common_1.NotFoundException("Movie not found");
        }
        return this.prisma.track.findMany({
            where: {
                scene: {
                    movieId,
                },
            },
            skip: pagination?.offset,
            take: pagination?.limit,
            orderBy: [{ scene: { orderIndex: "asc" } }, { createdAt: "desc" }],
            include: {
                song: true,
                scene: true,
            },
        });
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map