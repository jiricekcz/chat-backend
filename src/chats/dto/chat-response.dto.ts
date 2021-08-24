import { ApiProperty } from "@nestjs/swagger";
import { MemeberDto } from "src/users/dto/member.dto";
import { LastMessageDto } from "./last-message.dto";

export class ChatResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty({ type: () => MemeberDto, isArray: true })
    members: Array<MemeberDto>;
    @ApiProperty({ type: () => LastMessageDto })
    lastMessage: LastMessageDto;
}