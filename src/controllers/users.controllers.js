import { getCatsByUserIdDB } from "../repositories/users.repositories.js"

export async function getCatsByUser(req, res){

    const {user_id} = res.locals
    

    try {
        
        const myCats = await getCatsByUserIdDB(user_id)
        return res.status(201).send(myCats.rows)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}