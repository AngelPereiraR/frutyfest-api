"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrialDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_trial_dto_1 = require("./create-trial.dto");
class UpdateTrialDto extends (0, mapped_types_1.PartialType)(create_trial_dto_1.CreateTrialDto) {
}
exports.UpdateTrialDto = UpdateTrialDto;
//# sourceMappingURL=update-trial.dto.js.map