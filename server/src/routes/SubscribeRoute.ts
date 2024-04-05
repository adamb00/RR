import { Router } from 'express';
import SubscribeController from '../controllers/SubscribeController';

const subscribeController = new SubscribeController();
const router: Router = Router();

router.route('/').post(subscribeController.createSubscription);

export default router;
