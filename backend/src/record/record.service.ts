import {Injectable, NotFoundException, StreamableFile} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Record} from "./entities/record.entity";
import {In, Repository} from "typeorm";
import {CreateRecordDto} from "./dto/create-record.dto";
import * as FormData from 'form-data';
import axios from "axios";
import * as fs from "fs";
import {createReadStream} from "fs";
import {Participant} from "../participant/entities/participant.entity";
import {join} from "path";

@Injectable()
export class RecordService {
    constructor(
        @InjectRepository(Record)
        private readonly recordRepository: Repository<Record>,
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
    ) {
    }

    async isCreate(id: string) {
        const record = await this.recordRepository.findOneBy({id})
        return !!record;
    }

    async create(createRecordDto: CreateRecordDto, file: Express.Multer.File) {
        console.log(createRecordDto, file)
        const participants = await this.participantRepository.find({where: {id: In(JSON.parse(createRecordDto.participants))}})
        const roles = participants.map(participant => ({id: participant.id, role: participant.role}))

        const formData = new FormData();
        formData.append('audio', fs.createReadStream(file.path), {
            contentType: file.mimetype,
            filename: file.originalname
        });

        const recognitionText = await axios.post('http://62.84.126.41:5001/audio-to-text', formData, {
            headers: formData.getHeaders()
        });

        console.log(recognitionText.data);

        const dataForRecognitionRoles = {
            dialog: recognitionText.data.dialogue,
            roles
        }
        console.log(dataForRecognitionRoles)

        let recognitionTextWithRolesRequest = await fetch("http://51.250.4.87:5003/send_text", {
            method: 'post',
            body: JSON.stringify(dataForRecognitionRoles),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const recognitionTextWithRoles = await recognitionTextWithRolesRequest.json();


        console.log(recognitionTextWithRoles)

        const newRecord = {
            // name: createBookDto.name,
            // description: createBookDto.description,
            situationTableContent: "[]",
            situationTable: {id: recognitionTextWithRoles.type},
            duration: 0,
            date: createRecordDto.date,
            audioSrc: "https://d5d710csp8btpmh27bp8.apigw.yandexcloud.net/record/download/" + file.filename,
            // authors: createBookDto.authors?.map(author => ({id: author})),
            // speakers: createBookDto.speakers?.map(speaker => ({id: speaker})),
            // genres: createBookDto.genres?.map(genre => ({id: genre}))
        };

        console.log(newRecord)
        const res = await this.recordRepository.save(newRecord);
        return {recordID: res.id}
    }

    async findAll() {
        const records = await this.recordRepository.find({
            relations: {
                situationTable: true,
                participants: true,
                recognition_texts: {
                    errors: true
                }
            },
            select: {
                id: true,
                date: true,
                duration: true,
                situationTable: {
                    id: true,
                    name: true
                },
                participants: {
                    id: true,
                    name: true,
                    role: true,
                    avatarSrc: true
                },
                recognition_texts: {
                    id: true,
                    errors: true
                }
            }
        });

        return records.map(record => {
            const errorsCount = record.recognition_texts.reduce(
                (acc, cur) => acc + cur.errors.length,
                0
            )
            delete record["recognition_texts"]
            return {
                ...record,
                errorsCount
            }
        })
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
                        participant: true,
                        errors: true
                    }
                },
                order: {
                    recognition_texts: {
                        order_number: "ASC",
                        errors: {
                            order_number: "ASC"
                        }
                    },
                }
            },
        )
    }

    download(id: string) {
        const file = createReadStream(join(process.cwd(), "/uploads/" + id));
        return new StreamableFile(file)
    }
}
