import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    users: User[] = [{
        username: "User1",
        id: "0"
    },
    {
        username: "User2",
        id: "1"
    }];
    async findOne(username: string): Promise<User | null> {
        const u = this.users.find((v) => v.username == username);
        return u === undefined ? null : u;
    }
    async findById(id: string): Promise<User | null> {
        const u = this.users.find((v) => v.id == id);
        return u === undefined ? null : u;
    }
}
