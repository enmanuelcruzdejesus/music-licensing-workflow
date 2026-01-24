import { Controller } from "@nestjs/common";
import { LicensingService } from "./licensing.service";

@Controller("licensing")
export class LicensingController {
  constructor(private readonly licensingService: LicensingService) {}
}
