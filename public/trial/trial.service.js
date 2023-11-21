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
exports.TrialService = void 0;
const common_1 = require("@nestjs/common");
const trial_entity_1 = require("./entities/trial.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TrialService = class TrialService {
    constructor(trialModel) {
        this.trialModel = trialModel;
    }
    async create(createTrialDto) {
        try {
            const newTrial = new this.trialModel({
                ...createTrialDto
            });
            return await newTrial.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.BadRequestException(`${createTrialDto.name} already exists!`);
            }
            throw new common_1.InternalServerErrorException('Something terrible happen!!!');
        }
    }
    findAll() {
        return this.trialModel.find();
    }
    async findTrialById(id) {
        return await this.trialModel.findById(id);
    }
    async update(id, updateTrialDto) {
        const Trial = this.findTrialById(id);
        return this.trialModel.updateOne(Trial, updateTrialDto);
    }
    async remove(id) {
        const Trial = this.findTrialById(id);
        return this.trialModel.deleteOne(Trial);
    }
};
exports.TrialService = TrialService;
exports.TrialService = TrialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(trial_entity_1.Trial.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TrialService);
//# sourceMappingURL=trial.service.js.map