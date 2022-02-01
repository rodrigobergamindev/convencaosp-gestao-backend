import express from 'express'
import {router} from './routes/index'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

app.use(router)

app.listen(3333, () => console.log("Server on"))