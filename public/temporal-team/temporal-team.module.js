"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalTeamModule = void 0;
const common_1 = require("@nestjs/common");
const temporal_team_service_1 = require("./temporal-team.service");
const temporal_team_controller_1 = require("./temporal-team.controller");
const mongoose_1 = require("@nestjs/mongoose");
const temporal_team_entity_1 = require("./entities/temporal-team.entity");
const config_1 = require("@nestjs/config");
let TemporalTeamModule = class TemporalTeamModule {
};
exports.TemporalTeamModule = TemporalTeamModule;
exports.TemporalTeamModule = TemporalTeamModule = __decorate([
    (0, common_1.Module)({
        controllers: [temporal_team_controller_1.TemporalTeamController],
        providers: [temporal_team_service_1.TemporalTeamService],
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: temporal_team_entity_1.TemporalTeam.name,
                    schema: temporal_team_entity_1.TemporalTeamSchema
                }
            ])
        ],
    })
], TemporalTeamModule);
//# sourceMappingURL=temporal-team.module.js.map