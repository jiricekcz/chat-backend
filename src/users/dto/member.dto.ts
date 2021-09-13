import { ApiProperty } from "@nestjs/swagger";

export class MemeberDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
}