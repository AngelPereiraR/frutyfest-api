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
exports.TemporalTeamService = void 0;
const common_1 = require("@nestjs/common");
const temporal_team_entity_1 = require("./entities/temporal-team.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TemporalTeamService = class TemporalTeamService {
    constructor(temporalteamModel) {
        this.temporalteamModel = temporalteamModel;
    }
    async create(createTemporalTeamDto) {
        try {
            const newTemporalTeam = new this.temporalteamModel({
                ...createTemporalTeamDto
            });
            return await newTemporalTeam.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.BadRequestException(`${createTemporalTeamDto.color} already exists!`);
            }
            throw new common_1.InternalServerErrorException('Something terrible happen!!!');
        }
    }
    findAll() {
        return this.temporalteamModel.find();
    }
    async findTemporalTeamById(id) {
        return await this.temporalteamModel.findById(id);
    }
    async update(id, updateTemporalTeamDto) {
        const TemporalTeam = this.findTemporalTeamById(id);
        return this.temporalteamModel.updateOne(TemporalTeam, updateTemporalTeamDto);
    }
    async remove(id) {
        const TemporalTeam = this.findTemporalTeamById(id);
        return this.temporalteamModel.deleteOne(TemporalTeam);
    }
};
exports.TemporalTeamService = TemporalTeamService;
exports.TemporalTeamService = TemporalTeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(temporal_team_entity_1.TemporalTeam.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TemporalTeamService);
//# sourceMappingURL=temporal-team.service.js.map