import { getAllCatsDB, getCatByIdDB, createCatDB, updateCatDB } from "../repositories/cats.repositories.js"
import { getUserByIdDB } from "../repositories/users.repositories.js"

export async function getAllCats(req, res){

    try {
        const cats = await getAllCatsDB()
        if(cats.rowCount === 0) return res.send("Sem gatinhos registrados até o momento! Seja o primeiro a postar o seu miaudelinho!")
        return res.send(cats.rows)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function getCatById(req, res){

    const {id} = req.body

    try {

        const cat = await getCatByIdDB(id)
        if(cat.rowCount === 0 )return res.sendStatus(404)

        return res.send(cat.rows[0])

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function createCat(req, res){

    const {user_id} = res.locals
    const {name , characteristics, contact_info, active, photo_url} = req.body 

    try {
        const createdCat = await createCatDB(user_id, name , characteristics , contact_info , active, photo_url)

        return res.status(201).send(createdCat.rows[0])

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function updateCat(req, res){
    const {id} = req.params
    const {active} = req.body
    try {

        const cat = await getCatByIdDB(id)
        if(cat.rowCount === 0) return res.sendStatus(404)
        const owner = await getUserByIdDB(cat.rows[0].owner_id)
        if(owner.rowCount === 0) return res.sendStatus(404)
        const updatedCat = await updateCatDB(active , id)

        return res.status(200).send(updatedCat)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}