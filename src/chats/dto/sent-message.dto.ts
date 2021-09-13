import { ApiProperty } from "@nestjs/swagger";
import { MessageChatDto } from "./message-chat.dto";

export class SentMessageDto {
    @ApiProperty()
    content: string;
    
    @ApiProperty()
    id: number

    @ApiProperty()
    chat: MessageChatDto;
}