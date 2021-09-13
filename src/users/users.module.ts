import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./entities/user.entity"
@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule { }