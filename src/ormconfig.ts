import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config: SqliteConnectionOptions = {
    database: "./database.sqlite",
    type: "sqlite",
    entities: ["dist/**/*.entity.js"],
    synchronize: true
}
export default config;