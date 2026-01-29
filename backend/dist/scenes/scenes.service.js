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
exports.ScenesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ScenesService = class ScenesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(movieId, payload) {
        const movie = await this.prisma.movie.findUnique({ where: { id: movieId } });
        if (!movie) {
            throw new common_1.NotFoundException("Movie not found");
        }
        return this.prisma.scene.create({
            data: {
                movieId,
                name: payload.name,
                orderIndex: payload.orderIndex,
                startMs: payload.startMs,
                endMs: payload.endMs,
            },
        });
    }
    async findByMovie(movieId, pagination) {
        return this.prisma.scene.findMany({
            where: { movieId },
            skip: pagination?.offset,
            take: pagination?.limit,
            orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
        });
    }
};
exports.ScenesService = ScenesService;
exports.ScenesService = ScenesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScenesService);
//# sourceMappingURL=scenes.service.js.map