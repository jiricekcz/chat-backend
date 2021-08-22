import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from './local.strategy';
import { UsersService } from 'src/users/users.service';
import { JwtService } from 'src/jwt/jwt.service';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
    imports: [PassportModule],
    providers: [AuthService, LocalStrategy, UsersService, JwtService, JwtStrategy]
})
export class AuthModule { }
