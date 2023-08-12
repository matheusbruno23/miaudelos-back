import { Router } from "express";
import {authSchema} from "../schemas/auth.schemas.js"
import { userSchema } from "../schemas/users.schemas.js";
import {validateSchema} from "../middlewares/validation.middlewares.js"
import { signUp , signIn } from "../controllers/auth.controllers.js";
const authRouter = Router()

authRouter.post("/signup", validateSchema(userSchema), signUp )
authRouter.post("/" , validateSchema(authSchema), signIn)

export default authRouter