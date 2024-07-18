import express, { Express, Request, Response } from "express";
const app: Express = express();
import { router } from "./controller/libs.controller";
import { auth } from "./controller/auth.controller";
import { dashboard } from "./controller/dashboard.controller";
import { authMiddleware } from "./middlewares/auth.middleware";
import { feedback } from "./controller/feedback.controller";
import { verifiedWebsiteMiddleware } from "./middlewares/verified.middleware";

app.listen(3000, () => {
    console.log(`Server listening! at port 3000`)
})
app.use(express.json());
app.use('/libs/', router);
app.use('/api/v1/auth', auth);
app.use('/api/v1/dashboard', authMiddleware);
app.use('/api/v1/dashboard', dashboard);
app.use('/api/v1/feedback', verifiedWebsiteMiddleware);
app.use('/api/v1/feedback', feedback);