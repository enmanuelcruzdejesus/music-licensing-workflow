import { Module } from "@nestjs/common";
import { PrismaModule } from "./database/prisma.module";
import { LicensingModule } from "./licensing/licensing.module";
import { MoviesModule } from "./movies/movies.module";
import { RealtimeModule } from "./realtime/realtime.module";
import { ScenesModule } from "./scenes/scenes.module";
import { SongsModule } from "./songs/songs.module";
import { TracksModule } from "./tracks/tracks.module";

@Module({
  imports: [
    PrismaModule,
    MoviesModule,
    ScenesModule,
    SongsModule,
    TracksModule,
    LicensingModule,
    RealtimeModule,
  ],
})
export class AppModule {}
