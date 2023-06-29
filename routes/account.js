import express from 'express';
import { accountController } from '../controllers/accountController.js';

const accountRouter = express.Router();

accountRouter.get('/', accountController.getAllAccounts);
accountRouter.get('/:id', accountController.getAccountById);
accountRouter.post('/', accountController.createAccount);
accountRouter.put('/:id', accountController.updateAccount);
accountRouter.delete('/:id', accountController.deleteAccount);

export default accountRouter;
