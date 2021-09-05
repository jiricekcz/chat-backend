import { ApiProperty } from '@nestjs/swagger';
import { Chat } from 'src/chats/entities/chat.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    username: string;

    @ManyToMany(() => Chat, (chat: Chat) => chat.members)
    chats: Chat[]
}