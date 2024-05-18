import {Injectable} from '@nestjs/common';
import {CreateSituationTableDto} from './dto/create-situation-table.dto';
import {UpdateSituationTableDto} from './dto/update-situation-table.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SituationTable} from "./entities/situation-table.entity";

@Injectable()
export class SituationTableService {
    constructor(
        @InjectRepository(SituationTable)
        private readonly situationTableRepository: Repository<SituationTable>,
    ) {
    }


    create(createSituationTableDto: CreateSituationTableDto) {
        return 'This action adds a new situationTable';
    }

    async findAll() {
        return await this.situationTableRepository.find();
    }

    findOne(id: string) {
        return `This action returns a #${id} situationTable`;
    }
}
