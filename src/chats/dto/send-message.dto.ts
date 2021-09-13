import { ApiProperty } from "@nestjs/swagger";

export class SendMessageDto {
    @ApiProperty()
    content: string;
}
