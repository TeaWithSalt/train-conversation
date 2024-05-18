import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    secondName: string;

    @Column()
    password: string;

    @Column()
    avatarSrc: string;

    @CreateDateColumn({select: true})
    created_at: Date;

    @UpdateDateColumn({select: false})
    updated_at: Date;
}
