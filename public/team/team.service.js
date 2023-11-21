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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const team_entity_1 = require("./entities/team.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TeamService = class TeamService {
    constructor(teamModel) {
        this.teamModel = teamModel;
    }
    async create(createTeamDto) {
        try {
            const newTeam = new this.teamModel({
                ...createTeamDto
            });
            return await newTeam.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.BadRequestException(`${createTeamDto.color} already exists!`);
            }
            throw new common_1.InternalServerErrorException('Something terrible happen!!!');
        }
    }
    findAll() {
        return this.teamModel.find();
    }
    async findTeamById(id) {
        return await this.teamModel.findById(id);
    }
    async update(id, updateTeamDto) {
        const Team = this.findTeamById(id);
        return this.teamModel.updateOne(Team, updateTeamDto);
    }
    async remove(id) {
        const Team = this.findTeamById(id);
        return this.teamModel.deleteOne(Team);
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(team_entity_1.Team.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TeamService);
//# sourceMappingURL=team.service.js.map