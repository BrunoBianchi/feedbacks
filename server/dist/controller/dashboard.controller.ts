import express, { Request, Response, NextFunction } from "express";
export const dashboard: express.Router = express.Router();
import { CrudeService } from "../services/Crude.service";
const crude = new CrudeService();
import { z } from "zod";

import { JWT } from "../services/JWT.service";
import { ownerMiddleware } from "../middlewares/owner.middleware";
const jwt = new JWT();
dashboard.post('/create-form', async (req: Request, res: Response) => {
    try {
        const params = z.object({
            url: z.string(),
        }).required({ url: true, }).parse(req.body)
        const token = jwt.decryptJwtToken(req.headers.authorization!.split("Bearer")[1])
        const websiteForm = await crude.createFormWebsite((token.id || null) as string, params);
        return res.json({ id: websiteForm.id });
    } catch (err) {
        return res.status(400).json({ error: "Permission Denied!" })
    }
})

dashboard.get('/forms', async (req: Request, res: Response) => {
    try {
        const token = jwt.decryptJwtToken(req.headers.authorization!.split("Bearer")[1])
        const forms = await crude.getAllFormsFromUser((token.id || null) as string);
        return res.json(forms);
    } catch (err) {
        return res.status(400).json({ error: err })
    }

})

dashboard.get('/form/:id', ownerMiddleware, async (req: Request, res: Response) => {
    try {
        const params = z.object({
            id: z.string()
        }).required({ id: true }).parse(req.params);
        const form = await crude.getFormById(params.id);
        return res.json(form);
    } catch (err) {
        return res.status(400).json({ error: err })
    }
});


dashboard.get('/form/:id/feedbacks', ownerMiddleware, async (req: Request, res: Response) => {
    try {
        const params = z.object({
            id: z.string()
        }).required({ id: true }).parse(req.params);
        const feedbacks = await crude.getAllFeedbacks(params.id);
        return res.json(feedbacks);
    } catch (err) {
        return res.status(400).json({ error: err })
    }
});



dashboard.put('/form/:id/update-form', ownerMiddleware, async (req: Request, res: Response) => {
    try {
        const params = z.object({
            form: z.array(z.string()),
            css: z.string()
        }).required({ form: true, css: true }).parse(req.body);
        const formId = req.params.id;
        const newForm = await crude.updateForm(formId, params)
        return res.json("Form Mudado");
    } catch (err) {
        return res.status(400).json({ error: err })
    }
});