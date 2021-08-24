import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable, JoinColumn, OneToOne } from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ManyToMany(() => User, (user: User) => user.chats,{
        eager: true
    })
    @JoinTable({
        name: "chat_members_join",
        joinColumn: {
            name: "chat",
            referencedColumnName: "id"
        },
        inverseJoinColumn: { 
            name: "members",
            referencedColumnName: "id"
        }
    })
    @ApiProperty({ type: () => User, isArray: true })
    members: Array<User>;

    @OneToMany(() => Message, (message: Message) => message.chat)
    @ApiProperty({ type: Message, isArray: true })
    messages: Array<Message>

    @Column({
        default: 0
    })
    messageCount: number;

}