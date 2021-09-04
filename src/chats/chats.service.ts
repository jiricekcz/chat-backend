import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { Between } from "typeorm";

@Injectable()
export class ChatsService {
    constructor(@InjectRepository(Message) private readonly messageRepository: Repository<Message>, @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>) { }
    async getChatById(id: number): Promise<Chat> {
        return this.chatRepository.findOne(id);
    }
    async getAllChatsForUser(user: User): Promise<Chat[]> {
        console.log(user.chats);
        return user.chats;
    }
    async sendMessage(chat: Chat, content: string, user: User): Promise<Message> {
        const message = this.messageRepository.create({
            chat, content, author: user, numberInChat: ++chat.messageCount, sentAt: Date.now()
        });
        await this.chatRepository.save(chat);
        return await this.messageRepository.save(message);
    }
    async getLastMessage(chat: Chat): Promise<Message> {
        const message = this.messageRepository.findOne({
            where: { chat: chat, numberInChat: chat.messageCount },
            relations: ["author"]
        });
        return message;
    }
    async createChat(name: string, members: User[]): Promise<Chat> {
        const chat = await this.chatRepository.create({
            members: members,
            messages: [],
            name
        });
        return await this.chatRepository.save(chat);
    }
    async getMessages(chat: Chat, count: number, skipCount: number = 0): Promise<Message[]> {
        return this.messageRepository.find({
            where: {
                chat,
                numberInChat: Between(chat.messageCount - skipCount - count, chat.messageCount - skipCount)
            }
        });
    }
}
