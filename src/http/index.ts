import http from "http";

export const server = http.createServer((req, res) => {
    
});
export function init(port: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        server.listen(port, () => {
            resolve();
        });
    })
}