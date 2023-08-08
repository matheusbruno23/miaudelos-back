import express from "express"
import cors from "cors"


const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()



const PORT =  5000 || process.env.PORT 
app.listen(5000, () => console.log(`Running server on ${PORT}`))