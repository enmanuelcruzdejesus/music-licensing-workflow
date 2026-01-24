import { Controller } from "@nestjs/common";
import { ScenesService } from "./scenes.service";

@Controller("scenes")
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) {}
}
