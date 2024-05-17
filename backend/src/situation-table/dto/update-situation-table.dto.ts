import { PartialType } from '@nestjs/mapped-types';
import { CreateSituationTableDto } from './create-situation-table.dto';

export class UpdateSituationTableDto extends PartialType(CreateSituationTableDto) {}
