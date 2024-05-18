import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ParticipantService} from './participant.service';
import {CreateParticipantDto} from './dto/create-participant.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('participant')
export class ParticipantController {
    constructor(private readonly participantService: ParticipantService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createParticipantDto: CreateParticipantDto) {
        return this.participantService.create(createParticipantDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.participantService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.participantService.findOne(id);
    }
}
