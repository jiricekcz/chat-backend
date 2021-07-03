import http from "http";
import router from "./router";
const headers = {
    "content-type": "application/json"
}

export const server = http.createServer(async (req, res) => {
    var body = "";
    req.on("data", d => {
        body += d;
    });
    req.on("end", async () => {
        const response = await router(req, body);
        res.writeHead(response.status, headers);
        res.end(response.response);
    });
});
export function init(port: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        server.listen(port, () => {
            resolve();
        });
    })
}