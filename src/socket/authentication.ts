export default async function auth(token: string, room: string, id: string): Promise<boolean> {
    console.log("Client Authentication Request with token: " + token.blue + " to room " + room.blue + " with id " + id.blue);
    return true;
}