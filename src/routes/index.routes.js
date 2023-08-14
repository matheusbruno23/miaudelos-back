import { Router } from "express";
import catsRouter from "./cats.routes.js";
import authRouter from "./auth.routes.js";
import userRouter from "./users.routes.js";

const router = Router()

router.use(catsRouter)
router.use(authRouter)
router.use(userRouter)

export default router