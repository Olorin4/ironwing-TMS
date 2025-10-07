import { Router } from "express";
import authRouter from "./features/auth/auth.routes.js";
import formRouter from "./features/forms/forms.routes.js";

const apiRouter = Router();

// Register Feature Routes
apiRouter.use("/auth", authRouter);
apiRouter.use("/forms", formRouter);

export default apiRouter;
