import express, { Request, Response } from "express";
export const feedback: express.Router = express.Router();
import { openAIService } from "../services/oepnAi.service";
import { z } from "zod";
import { CrudeService } from "../services/Crude.service";
const crude = new CrudeService();
feedback.post('/send-feedback', async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        let params: any = z.object({
            user: z.string(),

            rating: z.string()
        }).parse(req.body);
        //TODO adicionar verificacao que pode nao conter comentario, somete rating,por exemplo!
        params.comments = Object.keys(req.body).filter((comment: any) => comment.includes('comment')).map(c_title => req.body[c_title])
        if (!params.comments || params.comments.length <= 0) return res.sendStatus(400);
        const AI = openAIService.instance;
        const response = await AI.verifyFeedback(params.comments, req.headers.host || '');
        if (response == 'true') {
            await crude.createFeedback(req.headers.host || '', params);
        }
        return res.json({ response });
    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

