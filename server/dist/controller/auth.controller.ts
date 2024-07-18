import express, { Request, Response, NextFunction } from "express";
export const auth: express.Router = express.Router();
import { CrudeService } from "../services/Crude.service";
const crude = new CrudeService();
import { z } from "zod";

import { JWT } from "../services/JWT.service";
const jwt = new JWT();
auth.post('/sign-up', async (req: Request, res: Response) => {
    try {
        const user = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
        }).required({ name: true, email: true, password: true }).parse(req.body)
        const userFromDB = await crude.createUser(user);
        const token = await jwt.generateJwtToken(userFromDB)
        return res.json({ authorization_token: `Bearer ${token}` });
    } catch (err) {
        return res.status(400).json({ error: err })
    }

})

auth.post('/sign-in', async (req: Request, res: Response) => {
    try {
        const credentials = z.object({
            email: z.string(),
            password: z.string()
        }).required({ email: true, password: true }).parse(req.body);
        const user = await crude.getUserByEmailAndPassword(credentials);
        const token = await jwt.generateJwtToken(user)
        return res.json({ authorization_token: `Bearer ${token}` });
    } catch (err) {
        return res.status(400).json({ error: err })
    }

})