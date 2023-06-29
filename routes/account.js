import express from "express"
const router = express.Router()

import { accountService } from "../services/"

router.get('/', accountService.getAll)
router.get('/:id', accountService.get)
router.post('/', accountService.create)
router.put('/:id', accountService.update)
router.delete('/:id', accountService.delete)

export default router