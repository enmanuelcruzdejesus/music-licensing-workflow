import { LicensingStatus } from "../../common/enums/licensing-status.enum";
export declare class UpdateLicensingStatusDto {
    status: LicensingStatus;
    note?: string;
    actor?: string;
}
