import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { LicensingStatus } from "../common/enums/licensing-status.enum";
import { PrismaService } from "../database/prisma.service";
import { UpdateLicensingStatusDto } from "./dto/update-licensing-status.dto";

@Injectable()
export class LicensingService {
  private readonly transitions: Record<LicensingStatus, LicensingStatus[]> = {
    [LicensingStatus.DRAFT]: [LicensingStatus.REQUESTED],
    [LicensingStatus.REQUESTED]: [LicensingStatus.NEGOTIATING, LicensingStatus.REJECTED],
    [LicensingStatus.NEGOTIATING]: [LicensingStatus.APPROVED, LicensingStatus.REJECTED],
    [LicensingStatus.APPROVED]: [],
    [LicensingStatus.REJECTED]: [],
  };

  constructor(private readonly prisma: PrismaService) {}

  async updateStatus(trackId: string, payload: UpdateLicensingStatusDto) {
    const track = await this.prisma.track.findUnique({ where: { id: trackId } });

    if (!track) {
      throw new NotFoundException("Track not found");
    }

    const fromStatus = track.licensingStatus as LicensingStatus;
    const toStatus = payload.status;

    if (fromStatus === toStatus) {
      throw new BadRequestException("Track already in desired status");
    }

    if (!this.transitions[fromStatus]?.includes(toStatus)) {
      throw new BadRequestException("Invalid licensing status transition");
    }

    return this.prisma.$transaction(async (tx) => {
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
  }
}
