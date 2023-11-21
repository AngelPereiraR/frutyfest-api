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
exports.TemporalTeamController = void 0;
const common_1 = require("@nestjs/common");
const temporal_team_service_1 = require("./temporal-team.service");
const dto_1 = require("./dto");
let TemporalTeamController = class TemporalTeamController {
    constructor(temporalteamService) {
        this.temporalteamService = temporalteamService;
    }
    create(createTemporalteamDto) {
        return this.temporalteamService.create(createTemporalteamDto);
    }
    findAll() {
        return this.temporalteamService.findAll();
    }
    findOne(id) {
        return this.temporalteamService.findTemporalTeamById(id);
    }
    update(id, updateTemporalteamDto) {
        return this.temporalteamService.update(id, updateTemporalteamDto);
    }
    remove(id) {
        return this.temporalteamService.remove(id);
    }
};
exports.TemporalTeamController = TemporalTeamController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTemporalTeamDto]),
    __metadata("design:returntype", void 0)
], TemporalTeamController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TemporalTeamController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemporalTeamController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateTemporalTeamDto]),
    __metadata("design:returntype", void 0)
], TemporalTeamController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemporalTeamController.prototype, "remove", null);
exports.TemporalTeamController = TemporalTeamController = __decorate([
    (0, common_1.Controller)('temporalteam'),
    __metadata("design:paramtypes", [temporal_team_service_1.TemporalTeamService])
], TemporalTeamController);
//# sourceMappingURL=temporal-team.controller.js.map