import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {RecognitionTextService} from './recognition-text.service';
import {CreateRecognitionTextDto} from './dto/create-recognition-text.dto';
import {UpdateRecognitionTextDto} from './dto/update-recognition-text.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('recognition-text')
export class RecognitionTextController {
    constructor(private readonly recognitionTextService: RecognitionTextService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createRecognitionTextDto: CreateRecognitionTextDto) {
        return this.recognitionTextService.create(createRecognitionTextDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.recognitionTextService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recognitionTextService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRecognitionTextDto: UpdateRecognitionTextDto) {
        return this.recognitionTextService.update(+id, updateRecognitionTextDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recognitionTextService.remove(+id);
    }
}
