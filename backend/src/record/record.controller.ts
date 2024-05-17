import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param, ParseFilePipeBuilder,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {RecordService} from './record.service';
import {CreateRecordDto} from './dto/create-record.dto';
import {UpdateRecordDto} from './dto/update-record.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";

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
    create(@Body() createRecordDto: CreateRecordDto,
           @UploadedFile(
               new ParseFilePipeBuilder()
                   .addFileTypeValidator({
                       fileType: 'mp3',
                   }).build({
                   errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
               })
           ) file: Express.Multer.File
    ) {
        return this.recordService.create(createRecordDto, file);
    }

    @Get()
    findAll() {
        return this.recordService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recordService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
        return this.recordService.update(+id, updateRecordDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recordService.remove(+id);
    }
}
