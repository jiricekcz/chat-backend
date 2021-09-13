import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm"
import { Chat } from 'src/chats/entities/chat.entity';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
    async findOne(username: string, loadChats = false): Promise<User | null> {
        const relations = loadChats ? {
            relations: ["chats"]
        } : null;
        const u = await this.userRepository.findOne({
            where: { username: username },
            ...relations
        });
        return u === undefined ? null : u;
    }
    async findById(id: string, loadChats = false): Promise<User | null> {
        const relations = loadChats ? {
            relations: ["chats"]
        } : null;
        const u = await this.userRepository.findOne(id , {
            ...relations,
        });
        return u === undefined ? null : u;
    }
    async create(username: string): Promise<void> {
        const u = this.userRepository.create();
        u.username = username;
        await this.userRepository.insert(u);
    }
    async addChatToUser(chat: Chat, user: User): Promise<void> {
        user.chats.push(chat);
        await this.userRepository.save(user);
    }
}
