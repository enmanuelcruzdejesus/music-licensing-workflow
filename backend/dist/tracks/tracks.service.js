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
exports.TracksService = void 0;
const common_1 = require("@nestjs/common");
const licensing_status_enum_1 = require("../common/enums/licensing-status.enum");
const prisma_service_1 = require("../database/prisma.service");
let TracksService = class TracksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(sceneId, payload) {
        const scene = await this.prisma.scene.findUnique({ where: { id: sceneId } });
        if (!scene) {
            throw new common_1.NotFoundException("Scene not found");
        }
        if (!payload.songId && !payload.song) {
            throw new common_1.BadRequestException("Provide either songId or song details");
        }
        if (payload.songId && payload.song) {
            throw new common_1.BadRequestException("Provide only one of songId or song");
        }
        return this.prisma.$transaction(async (tx) => {
            let songId;
            if (payload.songId) {
                const song = await tx.song.findUnique({ where: { id: payload.songId } });
                if (!song) {
                    throw new common_1.NotFoundException("Song not found");
                }
                songId = song.id;
            }
            else {
                const song = await tx.song.create({
                    data: {
                        title: payload.song.title,
                        artist: payload.song.artist,
                        isrc: payload.song.isrc,
                        durationMs: payload.song.durationMs,
                    },
                });
                songId = song.id;
            }
            const track = await tx.track.create({
                data: {
                    sceneId,
                    songId,
                    startMs: payload.startMs,
                    endMs: payload.endMs,
                },
                include: {
                    song: true,
                },
            });
            if (payload.note) {
                await tx.licensingEvent.create({
                    data: {
                        trackId: track.id,
                        fromStatus: licensing_status_enum_1.LicensingStatus.DRAFT,
                        toStatus: licensing_status_enum_1.LicensingStatus.DRAFT,
                        note: payload.note,
                    },
                });
            }
            return track;
        });
    }
    async findByScene(sceneId, pagination) {
        return this.prisma.track.findMany({
            where: { sceneId },
            skip: pagination?.offset,
            take: pagination?.limit,
            orderBy: { createdAt: "desc" },
            include: {
                song: true,
            },
        });
    }
    async findLicensingEvents(trackId) {
        const track = await this.prisma.track.findUnique({ where: { id: trackId } });
        if (!track) {
            throw new common_1.NotFoundException("Track not found");
        }
        return this.prisma.licensingEvent.findMany({
            where: { trackId },
            orderBy: { createdAt: "asc" },
        });
    }
};
exports.TracksService = TracksService;
exports.TracksService = TracksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TracksService);
//# sourceMappingURL=tracks.service.js.map