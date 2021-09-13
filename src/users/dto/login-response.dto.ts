import { ApiProperty } from '@nestjs/swagger'
import { User } from '../entities/user.entity';


export class LoginResponse {
    @ApiProperty()
    token: string;
    @ApiProperty()
    user: User;
}