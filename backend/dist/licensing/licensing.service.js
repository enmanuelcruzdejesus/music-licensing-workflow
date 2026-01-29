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
exports.LicensingService = void 0;
const common_1 = require("@nestjs/common");
const licensing_status_enum_1 = require("../common/enums/licensing-status.enum");
const prisma_service_1 = require("../database/prisma.service");
const realtime_service_1 = require("../realtime/realtime.service");
let LicensingService = class LicensingService {
    constructor(prisma, realtimeService) {
        this.prisma = prisma;
        this.realtimeService = realtimeService;
        this.transitions = {
            [licensing_status_enum_1.LicensingStatus.DRAFT]: [licensing_status_enum_1.LicensingStatus.REQUESTED],
            [licensing_status_enum_1.LicensingStatus.REQUESTED]: [licensing_status_enum_1.LicensingStatus.NEGOTIATING, licensing_status_enum_1.LicensingStatus.REJECTED],
            [licensing_status_enum_1.LicensingStatus.NEGOTIATING]: [licensing_status_enum_1.LicensingStatus.APPROVED, licensing_status_enum_1.LicensingStatus.REJECTED],
            [licensing_status_enum_1.LicensingStatus.APPROVED]: [],
            [licensing_status_enum_1.LicensingStatus.REJECTED]: [],
        };
    }
    async updateStatus(trackId, payload) {
        const track = await this.prisma.track.findUnique({ where: { id: trackId } });
        if (!track) {
            throw new common_1.NotFoundException("Track not found");
        }
        const fromStatus = track.licensingStatus;
        const toStatus = payload.status;
        if (fromStatus === toStatus) {
            throw new common_1.BadRequestException("Track already in desired status");
        }
        if (!this.transitions[fromStatus]?.includes(toStatus)) {
            throw new common_1.BadRequestException("Invalid licensing status transition");
        }
        const updated = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.track.update({
                where: { id: trackId },
                data: { licensingStatus: toStatus },
            });
            await tx.licensingEvent.create({
                data: {
                    trackId,
                    fromStatus,
                    toStatus,
                    note: payload.note,
                    actor: payload.actor,
                },
            });
            return updated;
        });
        await this.realtimeService.publish("licensing.status.updated", {
            trackId,
            fromStatus,
            toStatus,
        });
        return updated;
    }
};
exports.LicensingService = LicensingService;
exports.LicensingService = LicensingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        realtime_service_1.RealtimeService])
], LicensingService);
//# sourceMappingURL=licensing.service.js.map