import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Record} from "../../record/entities/record.entity";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column()
    avatarSrc: string;

    @ManyToMany(() => Record, (record) => record.participants, {onDelete: "CASCADE"})
    @JoinTable({
        name: "participant_record", joinColumn: {
            name: 'participant_id',
            referencedColumnName: 'id',
        }, inverseJoinColumn: {
            name: 'record_id',
            referencedColumnName: 'id',
        },
    })
    records: Record[];
}
