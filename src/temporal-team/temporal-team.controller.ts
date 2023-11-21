import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TemporalTeamService } from './temporal-team.service';
import { CreateTemporalTeamDto, UpdateTemporalTeamDto } from './dto';

@Controller('temporalteam')
export class TemporalTeamController {
  constructor(private readonly temporalteamService: TemporalTeamService) { }

  @Post()
  create(@Body() createTemporalteamDto: CreateTemporalTeamDto) {
    return this.temporalteamService.create(createTemporalteamDto);
  }

  @Get()
  findAll() {
    return this.temporalteamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.temporalteamService.findTemporalTeamById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemporalteamDto: UpdateTemporalTeamDto) {
    return this.temporalteamService.update(id, updateTemporalteamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.temporalteamService.remove(id);
  }
}
