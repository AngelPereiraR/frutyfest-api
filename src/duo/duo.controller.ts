import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { DuoService } from './duo.service';
import { CreateDuoDto, UpdateDuoDto } from './dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('duo')
export class DuoController {
  constructor(private readonly duoService: DuoService) { }

  @Post()
  create(@Body() createDuoDto: CreateDuoDto) {
    return this.duoService.create(createDuoDto);
  }

  @Get()
  findAll() {
    return this.duoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.duoService.findDuoById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDuoDto: UpdateDuoDto) {
    return this.duoService.update(id, updateDuoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.duoService.remove(id);
  }
}
