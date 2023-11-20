import { PartialType } from '@nestjs/mapped-types';
import { CreateDuoDto } from './create-duo.dto';

export class UpdateDuoDto extends PartialType(CreateDuoDto) {}
