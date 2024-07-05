import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';

const router: Router = Router();
const transactionController = new TransactionController();

router.route('/').post(transactionController.createTransaction);

export default router;
