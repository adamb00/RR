import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router: Router = Router();
const authController = new AuthController();

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/signout', authController.signout);
router.get('/get-referralCode/:referralCode', authController.getReferralCode);

export default router;
