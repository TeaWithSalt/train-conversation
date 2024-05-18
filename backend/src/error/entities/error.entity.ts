import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RecognitionText} from "../../recognition-text/entities/recognition-text.entity";

@Entity()
export class Error {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    text: string

    @Column()
    reason: string

    @ManyToOne(() => RecognitionText, (recognitionText) => recognitionText.errors, {nullable: true})
    @JoinColumn({name: 'recognition_text'})
    recognition_text: RecognitionText;
}
