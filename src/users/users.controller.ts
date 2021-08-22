import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';

import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';


import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './dto/login-response.dto';
import { RegisterDto } from './dto/register.dto';

import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @ApiCreatedResponse({ type: LoginResponse })
    @Post("login")
    async login(@Request() req, @Body() body: LoginDto): Promise<LoginResponse> {
        const user: User = req.user;
        return { token: await this.authService.createJwt(user), user };
    }


    @Post("register")
    register(@Body() body: RegisterDto): any {

    }

    
    @UseGuards(JwtAuthGuard)
    @Get("protected")
    async pretectedResource(@Request() req): Promise<string> {
        console.log(req.user);
        return req.user;
    }

}
