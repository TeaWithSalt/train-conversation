import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Record} from "../../record/entities/record.entity";

@Entity()
export class SituationTable {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    tableTemplate: string;

    @OneToMany(() => Record, (record) => record.situationTable, {nullable: true})
    records: Record[];
}

