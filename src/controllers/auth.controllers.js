import { createSessionDB } from "../repositories/auth.repositories.js";
import { createUserDB , getUserByEmailDB } from "../repositories/users.repositories.js";
import {v4 as uuid} from "uuid"
import bcrypt from "bcrypt"

export async function signUp(req , res){
    const {name, email, password, cpf ,phone} = req.body

    try {
        
        const user = await getUserByEmailDB(email)
        if(user.rowCount !== 0) return res.sendStatus(409)

        const hash = bcrypt.hashSync(password, 10)
        await createUserDB(name, email, hash, cpf, phone)
        
        res.status(201).send('cadastro')

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function signIn(req, res){

    const {email , password} = req.body

    try {
        const user = await getUserByEmailDB(email)
        if (user.rowCount === 0) return res.sendStatus(401)

        const correctPassword = bcrypt.compareSync(password , user.rows[0].password)
        if(!correctPassword) return res.sendStatus(401)

        const token = uuid()

        await createSessionDB(user.rows[0].id, token)
        res.send({token})

    } catch (error) {
        res.status(500).send(error.message)
    }
}
