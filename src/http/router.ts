import http from 'http';


export default async function router(req: http.IncomingMessage, body: string): Promise<Response> {
    return {
        status: 404,
        response: JSON.stringify({
            msg: "Resource not found."
        })
    };
}

interface Response {
    status: number;
    response: string | undefined;
}