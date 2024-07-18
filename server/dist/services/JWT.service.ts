import * as jose from "jose";
import { User } from "../interfaces/User.interface";
const secret_jwt = new TextEncoder().encode(process.env.SECRET_JWT_TOKEN)
export class JWT {
    public async generateJwtToken(user: User) {
        const alg = 'HS256'
        return await new jose.SignJWT(user as any)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('urn:register')
            .sign(secret_jwt)
    }

    public decryptJwtToken(token: string) {
        if (!token) {
            throw "Permission Denied!"
        }
        try {
            const data = jose.decodeJwt(token);
            return data;
        } catch (err) {
            throw err;
        }


    }
}   