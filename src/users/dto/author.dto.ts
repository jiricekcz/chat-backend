import { ApiProperty } from "@nestjs/swagger";

export class AuthorDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;

}