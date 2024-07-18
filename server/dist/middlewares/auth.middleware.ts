import { Request, Response, NextFunction } from "express";
import { JWT } from "../services/JWT.service";
const jwt = new JWT();
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization || null;
    if (!token || !token.includes("Bearer")) {
        return res.status(400).send("Permission Denied!");
    }
    try {
        const user = await jwt.decryptJwtToken(token.split("Bearer")[1].trim());
        if (!user) {
            return res.status(400).send("Permission Denied!");
        }
        return next();

    } catch (err) {
        return res.status(400).send("Permission Denied!");
    }

}

