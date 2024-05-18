import {Controller, Get, UseGuards} from '@nestjs/common';
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
}
