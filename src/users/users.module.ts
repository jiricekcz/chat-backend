import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [AuthModule, JwtModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule { }
