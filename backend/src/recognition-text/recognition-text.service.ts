import { Injectable } from '@nestjs/common';
import { CreateRecognitionTextDto } from './dto/create-recognition-text.dto';
import { UpdateRecognitionTextDto } from './dto/update-recognition-text.dto';

@Injectable()
export class RecognitionTextService {
  create(createRecognitionTextDto: CreateRecognitionTextDto) {
    return 'This action adds a new recognitionText';
  }

  findAll() {
    return `This action returns all recognitionText`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recognitionText`;
  }

  update(id: number, updateRecognitionTextDto: UpdateRecognitionTextDto) {
    return `This action updates a #${id} recognitionText`;
  }

  remove(id: number) {
    return `This action removes a #${id} recognitionText`;
  }
}
