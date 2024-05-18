import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Participant} from "../../participant/entities/participant.entity";
import {Record} from "../../record/entities/record.entity";
import {Error} from "../../error/entities/error.entity";

@Entity()
export class RecognitionText {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    message: string;

    @Column({nullable: true})
    order_number: number;

    @ManyToOne(() => Participant, (participant) => participant.recognition_texts, {nullable: true})
    @JoinColumn({ name: 'participant'})
    participant: Participant;

    @ManyToOne(() => Record, (record) => record.recognition_texts, {nullable: true})
    @JoinColumn({ name: 'record'})
    record: Record;

    @OneToMany(() => Error, (error) => error.recognition_text, {nullable: true})
    errors: Error[];
}
