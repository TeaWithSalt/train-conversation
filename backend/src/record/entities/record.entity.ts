import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Participant} from "../../participant/entities/participant.entity";
import {SituationTable} from "../../situation-table/entities/situation-table.entity";

@Entity()
export class Record {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    audionSrc: string;

    @Column()
    recognitionText: string;

    @Column()
    situationTableContent: string;

    @Column()
    date: Date;

    @ManyToOne(() => SituationTable, (situationTable) => situationTable.records, {nullable: true})
    @JoinColumn({name: 'situation_table'})
    situationTable: SituationTable;

    @ManyToMany(() => Participant, (participant) => participant.records, {onDelete: "CASCADE"})
    participants: Participant[]
}
