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
exports.LicensingController = void 0;
const common_1 = require("@nestjs/common");
const licensing_service_1 = require("./licensing.service");
const update_licensing_status_dto_1 = require("./dto/update-licensing-status.dto");
let LicensingController = class LicensingController {
    constructor(licensingService) {
        this.licensingService = licensingService;
    }
    updateStatus(trackId, payload) {
        return this.licensingService.updateStatus(trackId, payload);
    }
};
exports.LicensingController = LicensingController;
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Param)("trackId", new common_1.ParseUUIDPipe({ version: "4" }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_licensing_status_dto_1.UpdateLicensingStatusDto]),
    __metadata("design:returntype", void 0)
], LicensingController.prototype, "updateStatus", null);
exports.LicensingController = LicensingController = __decorate([
    (0, common_1.Controller)("tracks/:trackId/licensing-status"),
    __metadata("design:paramtypes", [licensing_service_1.LicensingService])
], LicensingController);
//# sourceMappingURL=licensing.controller.js.map