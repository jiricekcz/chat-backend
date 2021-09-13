import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty()
    username: string;
    @ApiProperty({ description: "Anything works." })
    password: string;
}