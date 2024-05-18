import { PartialType } from '@nestjs/mapped-types';
import { CreateRecognitionTextDto } from './create-recognition-text.dto';

export class UpdateRecognitionTextDto extends PartialType(CreateRecognitionTextDto) {}
