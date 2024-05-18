import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param, ParseFilePipeBuilder,
    Patch,
    Post,
    UploadedFile, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {RecordService} from './record.service';
import {CreateRecordDto} from './dto/create-record.dto';
import {UpdateRecordDto} from './dto/update-record.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('record')
export class RecordController {
    constructor(private readonly recordService: RecordService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/',
        }),
        //   fileFilter: imageFileFilter,
    }))
    @UseGuards(JwtAuthGuard)
    create(@Body() createRecordDto: CreateRecordDto,
           @UploadedFile(
               new ParseFilePipeBuilder()
                   .addFileTypeValidator({
                       fileType: 'audio/wav',
                   }).build({
                   errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
               })
           ) file: Express.Multer.File
    ) {
        return this.recordService.create(createRecordDto, file);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.recordService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.recordService.findOne(id);
    }
}
