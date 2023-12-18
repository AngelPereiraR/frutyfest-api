import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TrialService } from './trial.service';
import { CreateTrialDto, UpdateTrialDto } from './dto';

@Controller('trial')
export class TrialController {
  constructor(private readonly trialService: TrialService) { }

  @Post()
  create(@Body() createtrialDto: CreateTrialDto) {
    return this.trialService.create(createtrialDto);
  }

  @Get()
  findAll() {
    return this.trialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trialService.findTrialById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatetrialDto: UpdateTrialDto) {
    return this.trialService.update(id, updatetrialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trialService.remove(id);
  }

  @Patch('/addTeamAssignated/:id')
  addTeamAssignated(@Param('id') id: string) {
    return this.trialService.addTeamAssignated(id);
  }

  @Patch('/removeTeamAssignated/:id')
  removeTeamAssignated(@Param('id') id: string) {
    return this.trialService.removeTeamAssignated(id);
  }
}
