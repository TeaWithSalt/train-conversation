import { Injectable } from '@nestjs/common';
import { CreateSituationTableDto } from './dto/create-situation-table.dto';
import { UpdateSituationTableDto } from './dto/update-situation-table.dto';

@Injectable()
export class SituationTableService {
  create(createSituationTableDto: CreateSituationTableDto) {
    return 'This action adds a new situationTable';
  }

  findAll() {
    return `This action returns all situationTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} situationTable`;
  }

  update(id: number, updateSituationTableDto: UpdateSituationTableDto) {
    return `This action updates a #${id} situationTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} situationTable`;
  }
}
