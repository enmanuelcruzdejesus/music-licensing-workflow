import { Body, Controller, Param, ParseUUIDPipe, Patch } from "@nestjs/common";
import { LicensingService } from "./licensing.service";
import { UpdateLicensingStatusDto } from "./dto/update-licensing-status.dto";

@Controller("tracks/:trackId/licensing-status")
export class LicensingController {
  constructor(private readonly licensingService: LicensingService) {}

  @Patch()
  updateStatus(
    @Param("trackId", new ParseUUIDPipe({ version: "4" })) trackId: string,
    @Body() payload: UpdateLicensingStatusDto,
  ) {
    return this.licensingService.updateStatus(trackId, payload);
  }
}
