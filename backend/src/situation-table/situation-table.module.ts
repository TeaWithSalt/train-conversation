import {Module} from '@nestjs/common';
import {SituationTableService} from './situation-table.service';
import {SituationTableController} from './situation-table.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SituationTable} from "./entities/situation-table.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SituationTable])],
    controllers: [SituationTableController],
    providers: [SituationTableService],
})
export class SituationTableModule {
}
