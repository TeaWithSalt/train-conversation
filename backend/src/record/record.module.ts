import {Module} from '@nestjs/common';
import {RecordService} from './record.service';
import {RecordController} from './record.controller';
import {Record} from "./entities/record.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Participant} from "../participant/entities/participant.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Record, Participant])],
    controllers: [RecordController],
    providers: [RecordService],
})
export class RecordModule {
}
