import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {SituationTableService} from './situation-table.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('situation-table')
export class SituationTableController {
  constructor(private readonly situationTableService: SituationTableService) {
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.situationTableService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.situationTableService.findOne(id);
  }
}
