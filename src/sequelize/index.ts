import Sequelize from "sequelize";
import path from "path";


export const sequelize = new Sequelize.Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../../database.sqlite"),
    logging: Boolean(process.env.CHAT_DEBUG)
});
export const databaseName = "SQLite: database.sqlite";
export class Message extends Sequelize.Model<{
    text: string,
    author: string,
    modifiedAt: number,
    chatId: string,
    id: string,
    numberInChat: number;
}> {
    text!: string;
    author!: string;
    modifiedAt!: number;
    chatId!: string;
    id!: string;
    numberInChat!: number;
}
Message.init({
    text: {
        type: Sequelize.DataTypes.STRING,
    },
    author: {
        type: Sequelize.DataTypes.STRING,
    },
    modifiedAt: {
        type: Sequelize.DataTypes.NUMBER
    },
    chatId: {
        type: Sequelize.DataTypes.STRING
    },
    id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
    },
    numberInChat: {
        type: Sequelize.DataTypes.NUMBER
    }
}, {
    sequelize,
    modelName: "Message"
});
export class Channel extends Sequelize.Model<{
    userIds: string;
    id: string;
    messageCount: number;
}>{
    userIds!: string;
    id!: string;
    messageCount!: number;
}
Channel.init({
    id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
    },
    messageCount: {
        type: Sequelize.DataTypes.NUMBER
    },
    userIds: {
        type: Sequelize.DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: "Channel"
});
export async function init(): Promise<void> {
    await sequelize.sync();
    
}