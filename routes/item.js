import express from 'express';
import { itemController } from '../controllers/itemController.js';

const itemRouter = express.Router();

itemRouter.get('/', itemController.getAllItems);
itemRouter.get('/account_id/:account_id', itemController.getAllItemsByAccountId);
itemRouter.get('/:id', itemController.getItemById);
itemRouter.post('/', itemController.createItem);
itemRouter.put('/:id', itemController.updateItem);
itemRouter.delete('/:id', itemController.deleteItem);

export default itemRouter;
