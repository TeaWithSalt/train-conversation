import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateParticipantDto} from './dto/create-participant.dto';
import {UpdateParticipantDto} from './dto/update-participant.dto';
import {Participant} from "./entities/participant.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
    ) {
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
            participants: participants.find(participant => participant.role === role)
        }))
    }

    findOne(id: number) {
        return `This action returns a #${id} participant`;
    }

    update(id: number, updateParticipantDto: UpdateParticipantDto) {
        return `This action updates a #${id} participant`;
    }

    remove(id: number) {
        return `This action removes a #${id} participant`;
    }
}
