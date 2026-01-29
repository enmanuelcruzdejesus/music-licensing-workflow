"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenesController = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const scenes_service_1 = require("./scenes.service");
const create_scene_dto_1 = require("./dto/create-scene.dto");
let ScenesController = class ScenesController {
    constructor(scenesService) {
        this.scenesService = scenesService;
    }
    create(movieId, payload) {
        return this.scenesService.create(movieId, payload);
    }
    findByMovie(movieId, pagination) {
        return this.scenesService.findByMovie(movieId, pagination);
    }
};
exports.ScenesController = ScenesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)("movieId", new common_1.ParseUUIDPipe({ version: "4" }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_scene_dto_1.CreateSceneDto]),
    __metadata("design:returntype", void 0)
], ScenesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)("movieId", new common_1.ParseUUIDPipe({ version: "4" }))),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ScenesController.prototype, "findByMovie", null);
exports.ScenesController = ScenesController = __decorate([
    (0, common_1.Controller)("movies/:movieId/scenes"),
    __metadata("design:paramtypes", [scenes_service_1.ScenesService])
], ScenesController);
//# sourceMappingURL=scenes.controller.js.map