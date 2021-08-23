import { Injectable, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from "crypto";


@Injectable()
export class JwtService {
    private publicKey: crypto.KeyObject;
    private privateKey: crypto.KeyObject;
    constructor() {
        this.privateKey = crypto.createPrivateKey(fs.readFileSync(path.join(__dirname, '../../rsa/private.pem')));
        this.publicKey = crypto.createPublicKey(fs.readFileSync(path.join(__dirname, '../../rsa/public.pem')));
    }
    async sign(payload: any): Promise<string> {
        const j = Buffer.from(JSON.stringify(payload)).toString("base64");
        const h = Buffer.from(JSON.stringify({
            alg: "RS256",
            typ: "JWT"
        })).toString("base64");
        const token = `${h}.${j}.${await this.signByKey(`${h}.${j}`)}`;
        return token;
    }
    async verify(token: string): Promise<any> {
        if (token.split(".").length !== 3) throw new BadRequestException();
        const [header, payload, signature] = token.split(".");
        let verify = crypto.createVerify("RSA-SHA256");
        verify.update(header + "." + payload);
        return verify.verify(this.publicKey, Buffer.from(signature, "base64")) ? JSON.parse(Buffer.from(payload, "base64").toString()) : null;
    }
    private async signByKey(string: string): Promise<string> {
        let sign = crypto.createSign("RSA-SHA256");
        sign.update(string); 
        return sign.sign(this.privateKey, "base64");
    }
}
