import { Router } from "express";
import catsRouter from "./cats.routes.js";
import authRouter from "./auth.routes.js";

const router = Router()

router.use(catsRouter)
router.use(authRouter)

export default router