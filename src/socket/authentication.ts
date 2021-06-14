export default async function auth(token: string): Promise<boolean> {
    console.log("Client Authentication Request with token: " + token)
    return true;
}