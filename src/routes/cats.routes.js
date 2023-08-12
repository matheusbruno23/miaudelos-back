import { Router } from "express";
import { validateSchema } from "../middlewares/validation.middlewares.js";
import { validateAuth } from "../middlewares/auth.middlewares.js";
import { catSchema } from "../schemas/cats.schemas.js";
import {getAllCats, getCatById, createCat, updateCat } from "../controllers/cats.controllers.js"

const catsRouter = Router()

catsRouter.get("/cats", getAllCats)
catsRouter.get("/catsq:id", getCatById)
catsRouter.post("/cats" , validateSchema(catSchema), createCat)
catsRouter.put("/cats/:id", validateAuth, updateCat)

export default catsRouter
