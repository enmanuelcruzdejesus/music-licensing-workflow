import { LicensingService } from "./licensing.service";
import { UpdateLicensingStatusDto } from "./dto/update-licensing-status.dto";
export declare class LicensingController {
    private readonly licensingService;
    constructor(licensingService: LicensingService);
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
