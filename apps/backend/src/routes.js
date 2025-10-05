// src/routes.js
import { Router } from "express";
import authRoutes from "./features/auth/auth.routes.js";
import formRoutes from "./features/forms/forms.routes.js";

const apiRouter = Router();

// Register Feature Routes
apiRouter.use("/auth", authRoutes);
apiRouter.use("/forms", formRoutes);

export default apiRouter;