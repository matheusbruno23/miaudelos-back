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
    const {name , characteristics, contact_info, active, photo_urls} = req.body 

    try {
        const createdCat = await createCatDB(user_id, name , characteristics , contact_info , active)

        const cat_id =  createdCat.rows[0].id

        for(const photo_url of photo_urls) {
            await db.query(`INSERT INTO cats_photos (cat_id , photo_url) VALUES ($1, $2);`, [cat_id, photo_url])
        }

        const catPhotos = await db.query(`
        SELECT cats.* , cats_photos.photo_url 
        FROM cats LEFT JOIN cats_photos ON cats.id = cats_photos.cat_id WHERE cats.id = $1;`, [cat_id])

        const resObject = {catInfo: createdCat.rows[0], photosUrls: catPhotos.rows.map(r =>  r.photo_url)}

        return res.status(201).send(resObject)

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