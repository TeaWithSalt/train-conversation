import {Injectable} from '@nestjs/common';
import {UpdateRecordDto} from './dto/update-record.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Record} from "./entities/record.entity";
import {Repository} from "typeorm";
import {CreateRecordDto} from "./dto/create-record.dto";

@Injectable()
export class RecordService {
    constructor(
        @InjectRepository(Record)
        private readonly recordRepository: Repository<Record>,
    ) {
    }

    async create(createRecordDto: CreateRecordDto, file: Express.Multer.File) {
        console.log(createRecordDto, file)

        const newRecord = {
            // name: createBookDto.name,
            // description: createBookDto.description,
            // publicationYear: createBookDto.publicationYear,
            // imageSrc: createBookDto.imageSrc,
            // authors: createBookDto.authors?.map(author => ({id: author})),
            // speakers: createBookDto.speakers?.map(speaker => ({id: speaker})),
            // genres: createBookDto.genres?.map(genre => ({id: genre}))
        };

        // const res = await this.recordRepository.save(newRecord);
        // return {recordID: res.id}
    }

    findAll() {
        return `This action returns all record`;
    }

    findOne(id: number) {
        return `This action returns a #${id} record`;
    }

    update(id: number, updateRecordDto: UpdateRecordDto) {
        return `This action updates a #${id} record`;
    }

    remove(id: number) {
        return `This action removes a #${id} record`;
    }
}
