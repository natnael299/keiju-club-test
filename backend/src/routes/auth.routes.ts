import { Router } from "express";

import { login } from "../controllers/auth.controller.js";

import { loginRateLimit } from "../middleware/loginRateLimit.middleware.js";

const authRouter = Router();

authRouter.post("/login", loginRateLimit, login);

export default authRouter;
