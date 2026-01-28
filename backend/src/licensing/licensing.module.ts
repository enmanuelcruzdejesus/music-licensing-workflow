import { Module } from "@nestjs/common";
import { RealtimeModule } from "../realtime/realtime.module";
import { LicensingController } from "./licensing.controller";
import { LicensingService } from "./licensing.service";

@Module({
  imports: [RealtimeModule],
  controllers: [LicensingController],
  providers: [LicensingService],
  exports: [LicensingService],
})
export class LicensingModule {}
