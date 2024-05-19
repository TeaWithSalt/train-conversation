import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Post,
    StreamableFile,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {RecordService} from './record.service';
import {CreateRecordDto} from './dto/create-record.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {extname} from 'path';

@Controller('record')
export class RecordController {
    constructor(private readonly recordService: RecordService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        },),
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

    @Get('/download/:id')
    downloadFile(@Param("id") id: string): StreamableFile {
        return this.recordService.download(id);
    }
}
