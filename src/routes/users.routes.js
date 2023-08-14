import { Router } from "express";
import { validateAuth } from "../middlewares/auth.middlewares.js";
import {getCatsByUser} from "../controllers/users.controllers.js"

const userRouter = Router()

userRouter.get("/me", validateAuth, getCatsByUser)

export default userRouter