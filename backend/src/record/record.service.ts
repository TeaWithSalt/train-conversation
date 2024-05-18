import {Injectable, NotFoundException} from '@nestjs/common';
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

    async isCreate(id: string) {
        const record = await this.recordRepository.findOneBy({id})
        return !!record;
    }

    async create(createRecordDto: CreateRecordDto, file: Express.Multer.File) {
        console.log(createRecordDto, file)

        const formData = new FormData();
        let blob = new Blob([file.buffer], { type: file.mimetype })
        formData.append("file", blob, file.originalname);

        let response = await fetch("http://89.208.216.16:5001/audio-to-text", {
            method: 'post',
            body: formData
        });

        response = await response.json();
        console.log(response)

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

    async findAll() {
        return await this.recordRepository.find({
            relations: {
                situationTable: true,
                participants: true,
            },
            select: {
                id: true,
                date: true,
                situationTable: {
                    id: true,
                    name: true
                },
                participants: {
                    id: true,
                    name: true,
                    role: true,
                    avatarSrc: true
                }
            }
        });
    }

    async findOne(id: string) {
        if (!await this.isCreate(id))
            throw new NotFoundException("Record not found!")

        return await this.recordRepository.findOne({
                where: {id},
                relations: {
                    situationTable: true,
                    participants: true,
                    recognition_texts: {
                        participant: true
                    }
                },
                order: {
                    recognition_texts: {
                        order_number: "ASC"
                    }
                }
            },
        )
    }
}
