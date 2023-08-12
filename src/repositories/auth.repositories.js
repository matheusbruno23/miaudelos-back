import {db} from "../database/db.connection.js"

export function createSessionDB(user_id, token){
    return db.query(`INSERT INTO sessions (user_id , token) VALUES ($1, $2);`,
     [user_id , token])
}

export function getSessionDB(token){
    return db.query(`SELECT user_id FROM sessions WHERE token=$1;`, [token])
}