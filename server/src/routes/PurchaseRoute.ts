import { Router } from 'express';
import { createPurchase } from './../controllers/PurchaseController';

const router: Router = Router();

router.route('/').post(createPurchase);

export default router;
