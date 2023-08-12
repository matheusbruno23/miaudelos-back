import { getSessionDB } from "../repositories/auth.repositories.js"
export async function validateAuth(req, res, next) {

    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) return res.sendStatus(401)

    try {

        const session = await getSessionDB(token)

        if (session.rowCount === 0) return res.sendStatus(401)

        res.locals.user_id = session.rows[0].user_id

        next()
    } catch (error) {
        res.status(500).send(error.message)
    }

}