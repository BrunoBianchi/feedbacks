import { NextFunction, Request, Response } from "express";
import { JWT } from "../services/JWT.service";
const jwt = new JWT();
import { CrudeService } from "../services/Crude.service";
const crude = new CrudeService();
export const ownerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || null;
    const formID = req.params.id;
    const user = await jwt.decryptJwtToken(token!.split("Bearer")[1].trim());

    const form = await crude.getFormById(formID);
    if (form?.userId != user.id) {
        return res.sendStatus(400);
    }
    return next();


}