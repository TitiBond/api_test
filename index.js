import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import accountRouter from "./routes/account.js";
import itemRouter from "./routes/item.js"

const PORT = process.env.SERVER_PORT || 3000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

server.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is working!.."
    });
});

server.use('/account', accountRouter);
server.use('/item', itemRouter)

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
