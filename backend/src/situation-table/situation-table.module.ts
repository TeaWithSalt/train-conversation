import { Module } from '@nestjs/common';
import { SituationTableService } from './situation-table.service';
import { SituationTableController } from './situation-table.controller';

@Module({
  controllers: [SituationTableController],
  providers: [SituationTableService],
})
export class SituationTableModule {}
