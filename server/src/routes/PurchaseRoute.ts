import { Router } from 'express';
import { adamPoints, createPurchase } from './../controllers/PurchaseController';

const router: Router = Router();

router.route('/').post(adamPoints, createPurchase);

export default router;
