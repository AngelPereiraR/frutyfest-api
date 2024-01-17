import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto } from './dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Post()
  create(@Body() createteamDto: CreateTeamDto) {
    return this.teamService.create(createteamDto);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findTeamById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateteamDto: UpdateTeamDto) {
    return this.teamService.update(id, updateteamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }

  @Put('/setEliminatedPhase1/:id')
  setEliminatedPhase1(@Param('id') id: string) {
    return this.teamService.setEliminatedPhase1(id);
  }

  @Put('/setEliminatedPhase2/:id')
  setEliminatedPhase2(@Param('id') id: string) {
    return this.teamService.setEliminatedPhase2(id);
  }

  @Put('/setEliminatedPhase3/:id')
  setEliminatedPhase3(@Param('id') id: string) {
    return this.teamService.setEliminatedPhase3(id);
  }

  @Put('/setEliminatedPhase4/:id')
  setEliminatedPhase4(@Param('id') id: string) {
    return this.teamService.setEliminatedPhase4(id);
  }

  @Put('/setWinner/:id')
  setWinner(@Param('id') id: string) {
    return this.teamService.setWinner(id);
  }
}
