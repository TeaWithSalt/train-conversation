import { Module } from '@nestjs/common';
import { RecognitionTextService } from './recognition-text.service';
import { RecognitionTextController } from './recognition-text.controller';

@Module({
  controllers: [RecognitionTextController],
  providers: [RecognitionTextService],
})
export class RecognitionTextModule {}
