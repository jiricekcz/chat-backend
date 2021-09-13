import { ApiProperty } from "@nestjs/swagger";
import { AuthorDto } from "../../users/dto/author.dto";

export class LastMessageDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    content: string;
    @ApiProperty({ type: () => AuthorDto })
    author: AuthorDto;
    @ApiProperty({ type: "number" })
    sentAt: Date;
}