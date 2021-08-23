import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from './local.strategy';
import { UsersService } from 'src/users/users.service';
import { JwtService } from 'src/jwt/jwt.service';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [PassportModule, TypeOrmModule.forFeature([User])],
    providers: [AuthService, LocalStrategy, UsersService, JwtService, JwtStrategy]
})
export class AuthModule { }
