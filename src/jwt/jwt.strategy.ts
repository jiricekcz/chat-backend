import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom"
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { JwtService } from "./jwt.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt-custom") {
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {
        super();
    }
    async validate(request: Request): Promise<{ payload: any, user: User }> {
        if (!(request.headers as any).authorization) throw new BadRequestException({
            reason: "Missing authorization header"
        });
        const token: string = (request.headers as any).authorization.includes("Bearer ") ? (request.headers as any).authorization.replace("Bearer ", "") : undefined;
        const payload = await this.jwtService.verify(token);
        if (!payload) throw new UnauthorizedException();
        return { 
            payload,
            user: await this.usersService.findById(payload.sub, true)
        }
    }
}