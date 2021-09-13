import { ApiProperty } from "@nestjs/swagger";

export class AddUserDto {
    @ApiProperty()
    userId: number;
}