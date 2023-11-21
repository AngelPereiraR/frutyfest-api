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
exports.TrialController = void 0;
const common_1 = require("@nestjs/common");
const trial_service_1 = require("./trial.service");
const dto_1 = require("./dto");
let TrialController = class TrialController {
    constructor(trialService) {
        this.trialService = trialService;
    }
    create(createtrialDto) {
        return this.trialService.create(createtrialDto);
    }
    findAll() {
        return this.trialService.findAll();
    }
    findOne(id) {
        return this.trialService.findTrialById(id);
    }
    update(id, updatetrialDto) {
        return this.trialService.update(id, updatetrialDto);
    }
    remove(id) {
        return this.trialService.remove(id);
    }
};
exports.TrialController = TrialController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTrialDto]),
    __metadata("design:returntype", void 0)
], TrialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrialController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateTrialDto]),
    __metadata("design:returntype", void 0)
], TrialController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrialController.prototype, "remove", null);
exports.TrialController = TrialController = __decorate([
    (0, common_1.Controller)('trial'),
    __metadata("design:paramtypes", [trial_service_1.TrialService])
], TrialController);
//# sourceMappingURL=trial.controller.js.map