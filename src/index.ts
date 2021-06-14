// Console Colors
import colors from 'colors';
colors;

// Dotenv config
import dotenv from "dotenv";
dotenv.config();
console.log("Environment config for chat server:".magenta)
for (var key in process.env) {
    if (!key.startsWith("CHAT_")) continue;
    console.log("    " + key.green + "=" + (process.env as any)[key].toString().blue);
}

//HTTP
import * as http from "./http";
http.init(Number(process.env.CHAT_API_PORT)).then(() => {
    console.log("HTTP services:".magenta)
    console.log("    HTTP initialized at port " + process.env.CHAT_API_PORT?.yellow)
})