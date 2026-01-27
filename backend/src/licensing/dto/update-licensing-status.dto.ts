import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { LicensingStatus } from "../../common/enums/licensing-status.enum";

export class UpdateLicensingStatusDto {
  @IsEnum(LicensingStatus)
  status!: LicensingStatus;

  @IsOptional()
  @IsString()
  @MinLength(1)
  note?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  actor?: string;
}
