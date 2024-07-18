import { NextFunction, Request, Response } from "express";
import { CrudeService } from "../services/Crude.service";
const crude = new CrudeService();
export const verifiedWebsiteMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const websiteUrl = req.headers.host;
    const website = await crude.findFormWebsite(websiteUrl as string);
    if (!website) {
        return res.sendStatus(404);
    }
    if (website.status.toString() != 'Activated') {
        return res.sendStatus(400);
    }
    return next();
}