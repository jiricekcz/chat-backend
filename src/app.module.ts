import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatsModule } from './chats/chats.module';
import config from "./ormconfig"
@Module({
    imports: [UsersModule, AuthModule, JwtModule, TypeOrmModule.forRoot(config), ChatsModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
