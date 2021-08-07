import * as sequelize from "./sequelize";
import sq from "sequelize";

const AND = sq.Op.and;
const OR = sq.Op.or;
const GTE = sq.Op.gte;
const LTE = sq.Op.lte;

export async function getMessages(channelId: string, from: number, to: number): Promise<Array<Message>> {
    const c = await getChannel(channelId);
    return await c.getMessages(from, to);
}
export async function getMessage(messageId: string): Promise<Message> {
    const m = await sequelize.Message.findByPk(messageId);
    if (!m) throw new Error("Message not found.");
    return Message.fromSequlize(m);
}
export async function addMessage(message: { author: string, chatId: string, text: string, modifiedAt: Date }): Promise<Message> {
    const chat = await getChannel(message.chatId);
    const m = await sequelize.Message.create(
        {
            author: message.author,
            chatId: message.chatId,
            modifiedAt: message.modifiedAt.getTime(),
            text: message.text,
            id: String(Date.now()) + Math.round(Math.random() * 10000),
            numberInChat: chat.messageCount + 1
        }
    );
    chat.update();
    chat.loadMessages(chat.messageCount - 1, chat.messageCount);
    return Message.fromSequlize(m);
}
export async function getChannelMessageCount(channelId: string): Promise<number> {
    const c = await getChannel(channelId);
    return c.messageCount;
}
// export async function 

export class Message {
    readonly channelId: string;
    readonly id: string;
    readonly text: string;
    readonly authorId: string;
    readonly modifiedAt: number;
    readonly numberInChat: number;
    constructor(id: string, channelId: string, text: string, authorId: string, modifiedAt: number, numberInChat: number) {
        this.authorId = authorId;
        this.channelId = channelId;
        this.id = id;
        this.text = text;
        this.modifiedAt = modifiedAt;
        this.numberInChat = numberInChat;
    }
    static fromSequlize(message: sequelize.Message): Message {
        return new Message(message.id, message.chatId, message.text, message.author, message.modifiedAt, message.numberInChat);
    }
}
export class Channel {
    readonly id: string;
    userIds: string[];
    readonly messages: Map<number, Message> = new Map<number, Message>();
    messageCount: number;
    readonly sequelize: sequelize.Channel;
    constructor(id: string, userIds: Array<string>, messageCount: number, seq: sequelize.Channel) {
        this.messageCount = messageCount;
        this.id = id;
        this.userIds = userIds;
        this.sequelize = seq;
    }
    async update(): Promise<void> {
        this.sequelize.save();
        const c = await sequelize.Channel.findByPk(this.id);
        if (!c) return;
        this.userIds = JSON.parse(c.userIds);
        this.messageCount = c.messageCount;
    }
    async incrementMessageCount(): Promise<void> {
        this.sequelize.messageCount++;
        this.update();
    }
    async loadMessages(minId: number, maxId: number): Promise<void> {
        const ms = await sequelize.Message.findAll({
            where: {
                numberInChat: {
                    [ AND ]: {
                        [ GTE ]: minId,
                        [ LTE ]: maxId
                    }
                }
            }
        });
        for (const m of ms) {
            this.messages.set(m.numberInChat, Message.fromSequlize(m));
        }
    }
    async getMessages(from: number, to: number): Promise<Array<Message>> {
        const missing: Array<number> = [];
        for (var i = from; i < to; i++) {
            if (!this.messages.has(i)) missing.push(i);
        }
        if (missing.length > 0) await this.loadMessages(Math.min(...missing), Math.max(...missing));
        const rv: Array<Message> = [];
        for (var i = from; i < to; i++) {
            rv.push(<Message>this.messages.get(i));
        }
        return rv;
    }
    static fromSequlize(channel: sequelize.Channel): Channel {
        return new Channel(channel.id, JSON.parse(channel.userIds), channel.messageCount, channel);
    }
}
// ! CACHE
export const cache: Map<string, Channel> = new Map<string, Channel>();
export async function cacheChannel(id: string): Promise<void> {
    const c = await sequelize.Channel.findByPk(id);
    if (!c) throw new Error("Channel not found.");
    cache.set(id, Channel.fromSequlize(c));
}

export async function getChannel(id: string): Promise<Channel> {
    if (!cache.has(id)) await cacheChannel(id);
    return <Channel>cache.get(id);
}