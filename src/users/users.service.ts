import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm"
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
    async findOne(username: string): Promise<User | null> {
        const u = await this.userRepository.findOne({
            where: { username: username }
        })
        return u === undefined ? null : u;
    }
    async findById(id: string): Promise<User | null> {
        const u = await this.userRepository.findOne(id);
        return u === undefined ? null : u;
    }
    async create(username: string): Promise<void> {
        const u = this.userRepository.create();
        u.username = username;
        await this.userRepository.insert(u);
    }
}
