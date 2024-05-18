import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {RecognitionTextService} from './recognition-text.service';
import {CreateRecognitionTextDto} from './dto/create-recognition-text.dto';
import {UpdateRecognitionTextDto} from './dto/update-recognition-text.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('recognition-text')
export class RecognitionTextController {
    constructor(private readonly recognitionTextService: RecognitionTextService) {
    }

}
