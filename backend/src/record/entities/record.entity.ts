import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Participant} from "../../participant/entities/participant.entity";
import {SituationTable} from "../../situation-table/entities/situation-table.entity";
import {RecognitionText} from "../../recognition-text/entities/recognition-text.entity";

@Entity()
export class Record {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    audioSrc: string;

    @Column()
    situationTableContent: string;

    @Column()
    date: Date;

    @Column({default: 0})
    duration: number;

    @ManyToOne(() => SituationTable, (situationTable) => situationTable.records, {nullable: true})
    @JoinColumn({name: 'situation_table'})
    situationTable: SituationTable;

    @ManyToMany(() => Participant, (participant) => participant.records, {onDelete: "CASCADE"})
    participants: Participant[]

    @OneToMany(() => RecognitionText, (recognitionText) => recognitionText.record, {nullable: true})
    recognition_texts: RecognitionText[];
}
