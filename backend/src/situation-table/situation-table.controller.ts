import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SituationTableService } from './situation-table.service';
import { CreateSituationTableDto } from './dto/create-situation-table.dto';
import { UpdateSituationTableDto } from './dto/update-situation-table.dto';

@Controller('situation-table')
export class SituationTableController {
  constructor(private readonly situationTableService: SituationTableService) {}

  @Post()
  create(@Body() createSituationTableDto: CreateSituationTableDto) {
    return this.situationTableService.create(createSituationTableDto);
  }

  @Get()
  findAll() {
    return this.situationTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.situationTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSituationTableDto: UpdateSituationTableDto) {
    return this.situationTableService.update(+id, updateSituationTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.situationTableService.remove(+id);
  }
}
