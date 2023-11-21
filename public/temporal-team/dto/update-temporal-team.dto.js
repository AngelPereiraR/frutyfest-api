"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTemporalTeamDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_temporal_team_dto_1 = require("./create-temporal-team.dto");
class UpdateTemporalTeamDto extends (0, mapped_types_1.PartialType)(create_temporal_team_dto_1.CreateTemporalTeamDto) {
}
exports.UpdateTemporalTeamDto = UpdateTemporalTeamDto;
//# sourceMappingURL=update-temporal-team.dto.js.map