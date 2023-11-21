"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrialModule = void 0;
const common_1 = require("@nestjs/common");
const trial_service_1 = require("./trial.service");
const trial_controller_1 = require("./trial.controller");
const mongoose_1 = require("@nestjs/mongoose");
const trial_entity_1 = require("./entities/trial.entity");
const config_1 = require("@nestjs/config");
let TrialModule = class TrialModule {
};
exports.TrialModule = TrialModule;
exports.TrialModule = TrialModule = __decorate([
    (0, common_1.Module)({
        controllers: [trial_controller_1.TrialController],
        providers: [trial_service_1.TrialService],
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: trial_entity_1.Trial.name,
                    schema: trial_entity_1.TrialSchema
                }
            ])
        ],
    })
], TrialModule);
//# sourceMappingURL=trial.module.js.map