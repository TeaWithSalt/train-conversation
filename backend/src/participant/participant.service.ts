import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateParticipantDto} from './dto/create-participant.dto';
import {Participant} from "./entities/participant.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Error} from "../error/entities/error.entity";

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
        @InjectRepository(Error)
        private readonly errorRepository: Repository<Error>,
    ) {
    }

    async isCreate(id: string) {
        const participant = await this.participantRepository.findOneBy({id})
        return !!participant;
    }

    async create(createParticipantDto: CreateParticipantDto) {
        const isParticipantExist = await this.participantRepository.existsBy({
            name: createParticipantDto.name,
        })

        if (isParticipantExist)
            throw new BadRequestException("The participant already exist!");


        const newParticipant = {
            name: createParticipantDto.name,
            role: createParticipantDto.role,
            avatarSrc: createParticipantDto.avatarSrc,
        };

        const res = await this.participantRepository.save(newParticipant);
        return {participantID: res.id}
    }

    async findAll() {
        const participants = await this.participantRepository.find({
            relations: {
                records: true
            }
        });

        const roles = [...new Set(participants.map(participant => participant.role))]
        return roles.map(role => ({
            roleName: role,
            participants: participants.filter(participant => participant.role === role)
        }))
    }

    async findOne(id: string) {
        if (!await this.isCreate(id))
            throw new NotFoundException("Record not found!")

        const errorsCount = await this.errorRepository.count({
            where: {
                recognition_text: {
                    participant: {id}
                }
            },
            relations: {
                recognition_text: {
                    participant: true
                }
            }
        })

        const participant = await this.participantRepository.findOne({
                where: {id},
                relations: {
                    records: {
                        situationTable: true,
                        participants: true
                    },
                    recognition_texts: {
                        participant: true,
                        errors: true
                    }
                },
            },
        )

        return {
            ...participant,
            errorsCount
        }
    }
}
