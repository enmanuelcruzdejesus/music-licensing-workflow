import { PrismaService } from "../database/prisma.service";
import { RealtimeService } from "../realtime/realtime.service";
import { UpdateLicensingStatusDto } from "./dto/update-licensing-status.dto";
export declare class LicensingService {
    private readonly prisma;
    private readonly realtimeService;
    private readonly transitions;
    constructor(prisma: PrismaService, realtimeService: RealtimeService);
    updateStatus(trackId: string, payload: UpdateLicensingStatusDto): Promise<{
        id: string;
        sceneId: string;
        songId: string;
        startMs: number;
        endMs: number;
        licensingStatus: import(".prisma/client").$Enums.LicensingStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
