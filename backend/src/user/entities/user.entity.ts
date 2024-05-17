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

    @CreateDateColumn({select: false})
    created_at: Date;

    @UpdateDateColumn({select: false})
    updated_at: Date;
}
