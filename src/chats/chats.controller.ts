import { Query } from '@nestjs/common';
import { NotFoundException, Param, UnauthorizedException } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { ChatsService } from './chats.service';
import { ChatResponseDto } from './dto/chat-response.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageInChatDto } from './dto/message-in-chat.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { SentMessageDto } from './dto/sent-message.dto';
import { Chat } from './entities/chat.entity';

@ApiTags("Chats")
@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService, private readonly usersService: UsersService) { }

    @Get()
    @ApiOkResponse({ type: ChatResponseDto, isArray: true })
    async getAllChats(): Promise<ChatResponseDto[]> {
        const user = await this.usersService.findById("1", true);
        console.log(user);
        const chats = await this.chatsService.getAllChatsForUser(user);
        const rv: Array<ChatResponseDto> = [];
        for (const chat of chats) {
            const lastMessage = await this.chatsService.getLastMessage(chat);
            rv.push({
                id: chat.id,
                members: chat.members.map(v => {
                    return {
                        id: v.id,
                        username: v.username,
                    }
                }),
                name: chat.name,
                lastMessage: lastMessage,
            })
        }
        return rv;
    }

    @Post()
    @ApiCreatedResponse({ type: Chat })
    async createChat(@Body() body: CreateChatDto): Promise<Chat> {
        const user = await this.usersService.findById("1", true);
        return this.chatsService.createChat(body.name, [user]);
    }

    @Post(":chatId/message")
    @ApiOkResponse({ type: SentMessageDto })
    async sendMessage(@Param("chatId") chatId: string, @Body() body: SendMessageDto): Promise<SentMessageDto> {
        const user = await this.usersService.findById("1", true);
        const chat = await this.chatsService.getChatById(Number(chatId));
        if (!chat) throw new NotFoundException("Chat not found.");
        if (!chat.members.some(member => member.id == user.id)) throw new UnauthorizedException("User does not have permission to send messages to this chat.");
        const message = await this.chatsService.sendMessage(chat, body.content, user);
        return {
            chat: {
                id: message.chat.id,
            },
            content: message.content,
            id: message.id
        }
    }

    @Get(":chatId/messages")
    @ApiOkResponse({ type: MessageInChatDto, isArray: true })
    @ApiQuery({ name: 'count', required: false })
    @ApiQuery({ name: 'from', required: false })
    async getMessages(@Param("chatId") chatId: string, @Query("count") count: number = 20, @Query("from") from: number = 0): Promise<MessageInChatDto[]> {
        const chat = await this.chatsService.getChatById(Number(chatId));
        return this.chatsService.getMessages(chat, count, from)
    }
}
