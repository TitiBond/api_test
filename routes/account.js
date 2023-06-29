import express from "express"
import {accountService} from "../services/account.js";


const routerAccount = express.Router()

routerAccount.get('/', accountService.getAll)
routerAccount.get('/:id', accountService.get)
routerAccount.post('/', accountService.create)
routerAccount.put('/:id', accountService.update)
routerAccount.delete('/:id', accountService.delete)

export default routerAccount
