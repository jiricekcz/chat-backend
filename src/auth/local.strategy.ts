import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string): Promise<User> {
        const user = await this.authService.validateUser(username);
        if (!user) throw new UnauthorizedException(); 

        return user;
    }
}