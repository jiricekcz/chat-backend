import http from 'http';
import * as messageManager from '../messageManager';



export default async function router(req: http.IncomingMessage, body: string): Promise<Response> {
    if (!req.url?.startsWith("/api/")) {
        return {
            status: 404,
            response: JSON.stringify({
                msg: "Resource not found.",
                possibleFix: "Maybe forgot the /api/ url prefix for all api requests."
            })
        }
    }
    if (req.method != "GET") return {
        status: 405,
        response: JSON.stringify({
            msg: "Method not supported."
        })
    }
    const url = req.url.replace("/api", "");
    if (url.startsWith("/channel")) {
        const newUrl = url.replace("/channel", "");
        const segments = newUrl.split("/").filter(v => v.length > 0);
        if (segments.length == 0) {
            return {
                status: 404,
                response: JSON.stringify({
                    msg: "Resource not found.",
                    possibleFix: "Maybe provide a channel id."
                })
            };
        }
        if (segments.length == 1) {
            try {
                const m = await messageManager.getMessages(segments[0]);
                return {
                    status: 200,
                    response: JSON.stringify({
                        messages: m
                    })
                };
            } catch (e) {
                if (!(e instanceof Error)) return {
                    status: 500,
                    response: e
                } 
                return {
                    status: 404,
                    response: JSON.stringify({
                        msg: e.message,
                    })
                }
            }
        }  
        if (segments.length == 2) {
            try {
                const m = await messageManager.getMessage(segments[0], segments[1]);
                return {
                    status: 200,
                    response: JSON.stringify({
                        message: m
                    })
                };
            } catch (e) {
                if (!(e instanceof Error)) return {
                    status: 500,
                    response: e
                } 
                return {
                    status: 404,
                    response: JSON.stringify({
                        msg: e.message,
                    })
                }
            }
        }

    }
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