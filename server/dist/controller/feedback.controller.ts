import express, { Request, Response } from "express";
export const feedback: express.Router = express.Router();
import { openAIService } from "../services/oepnAi.service";
import { z } from "zod";
import { CrudeService } from "../services/Crude.service";
const crude = new CrudeService();
feedback.post('/send-feedback', async (req: Request, res: Response) => {
    try {
        const params = z.object({
            user: z.string(),
            comments: z.array(z.string()),
            rating: z.number()
        }).required({ user: true, comments: true, rating: true }).parse(req.body);
        const AI = openAIService.instance;
        const response = await AI.verifyFeedback(params.comments, req.headers.host || '');
        if (response == 'true') {
            await crude.createFeedback(req.headers.host || '', params);
        }
        return res.json({ response });
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err })
    }

})

