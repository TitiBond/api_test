import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: false}))
server.use(cors())

server.use((req,res,next)=>{
    res.setHeader('Acces-Controll-Allow-Origin', '*')
    res.setHeader('Acces-Controll-Allow-Headers', 'Origin, X-Requested-With,Content,Accept,Content-Type,Authorization')
    res.setHeader('Acces-Controll-Allow-Methods', 'GET,POST,PUT,DELETE')
    next()
})

server.get('/', (req,res)=>{
    res.status(200).json({
        message: "Server is working !.."
    })
})

import { accountRoutes } from './routes/'
server.use('/account', accountRoutes)

server.listen(process.env.SERVER_PORT)

export default server