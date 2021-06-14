import Sequelize from "sequelize";

export const sequelize = new Sequelize.Sequelize({
    dialect: "sqlite",
    storage: "../../database.sqlite"
});
export const databaseName = "SQLite: database.sqlite"; 
export class Message extends Sequelize.Model {
    text!: string;
    author!: string;
    modifiedAt!: Date;
    chatId!: string;
}
Message.init({
    text: {
        type: Sequelize.DataTypes.STRING,
    },
    author: {
        type: Sequelize.DataTypes.STRING,
    },
    modifiedAt: {
        type: Sequelize.DataTypes.DATE
    },
    chatId: {
        type: Sequelize.DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "Message"
});
export async function init(): Promise<void> {
    await sequelize.sync();
}