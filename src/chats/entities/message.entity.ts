import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { ManyToOne, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chat.entity";
@Entity()
export class Message {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    @ApiProperty()
    content: string;

    @ManyToOne(type => Chat, chat => chat.messages)
    @ApiProperty({ type: () => Chat })
    chat: Chat;

    @Column()
    @ApiProperty()
    numberInChat: number;

    @ManyToOne(type => User, {
        eager: true
    })
    @ApiProperty({ type: () => User })
    author: User;

    @Column({ type: "datetime", default: 0 })
    @ApiProperty()
    sentAt: Date;
}