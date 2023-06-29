import 'dotenv/config'
import express from 'express'
import { Router } from 'express'
import cors from 'cors'
import routerAccount from './routes/account.js'

const PORT = process.env.SERVER_PORT || 3000;
const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: false}))
server.use(cors())

server.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})

const router = new Router()

server.get('/', (req,res)=>{
    res.status(200).json({
        message: "Server is working!.."
    })
})

router.use('/account', routerAccount)

server.use(router)

try {
    server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
} catch (error) {
    console.error(error);
}

export default server
