import {db} from "../database/db.connection.js"

export function getUserByEmailDB(email){
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email])
}

export function createUserDB(name, email, password, cpf , phone){
    return db.query(`INSERT INTO users (name, email, password, cpf , phone ) VALUES ($1 , $2, $3 , $4 , $5);`, [name, email , password, cpf , phone])
}

export function getUserByIdDB(id){
    return db.query(`SELECT * FROM users WHERE id=$1;`, [id])
}

export function getCatsByUserIdDB(user_id){
    return db.query(`SELECT * FROM cats WHERE user_id=$1;`, [user_id])
}