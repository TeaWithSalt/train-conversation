import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Participant} from "../../participant/entities/participant.entity";
import {Record} from "../../record/entities/record.entity";

@Entity()
export class RecognitionText {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    message: string;

    @Column()
    order_number: number;

    @ManyToOne(() => Participant, (participant) => participant.recognition_texts, {nullable: true})
    @JoinColumn({ name: 'participant'})
    participant: Participant;

    @ManyToOne(() => Record, (record) => record.recognition_texts, {nullable: true})
    @JoinColumn({ name: 'record'})
    record: Record;
}
