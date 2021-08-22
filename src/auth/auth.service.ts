import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

    async validateUser(username: string): Promise<User> {
        const user = await this.usersService.findOne(username);

        if (user) return user;
        return null;
    }

    async createJwt(user: User): Promise<string> {
        return this.jwtService.sign({
            sub: user.id,
            name: user.username
        }); 
    }
}
