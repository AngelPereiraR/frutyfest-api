import { PartialType } from '@nestjs/mapped-types';
import { CreateTemporalTeamDto } from './create-temporal-team.dto';

export class UpdateTemporalTeamDto extends PartialType(CreateTemporalTeamDto) {}
