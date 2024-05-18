import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Record} from "../../record/entities/record.entity";
import {RecognitionText} from "../../recognition-text/entities/recognition-text.entity";

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

    @OneToMany(() => RecognitionText, (recognitionText) => recognitionText.participant, {nullable: true})
    recognition_texts: RecognitionText[];
}
