import { ApiProperty } from "@nestjs/swagger";
import { AuthorDto } from "src/users/dto/author.dto";

export class MessageInChatDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    content: string;
    @ApiProperty()
    author: AuthorDto;
    @ApiProperty()
    sentAt: Date;
}