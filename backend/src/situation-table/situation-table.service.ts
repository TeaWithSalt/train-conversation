import {Injectable} from '@nestjs/common';
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

    async findAll() {
        return await this.situationTableRepository.find();
    }
}
