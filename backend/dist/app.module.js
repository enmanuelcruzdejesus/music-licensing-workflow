"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./database/prisma.module");
const licensing_module_1 = require("./licensing/licensing.module");
const movies_module_1 = require("./movies/movies.module");
const realtime_module_1 = require("./realtime/realtime.module");
const scenes_module_1 = require("./scenes/scenes.module");
const songs_module_1 = require("./songs/songs.module");
const tracks_module_1 = require("./tracks/tracks.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            movies_module_1.MoviesModule,
            scenes_module_1.ScenesModule,
            songs_module_1.SongsModule,
            tracks_module_1.TracksModule,
            licensing_module_1.LicensingModule,
            realtime_module_1.RealtimeModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map