import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { activateUser } from '../controllers/UserController';

const router: Router = Router();
const authController = new AuthController();

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/signout', authController.signout);
router.get('/get-referralCode/:referralCode', authController.getReferralCode);
router.get('/activate-account/:token', activateUser);

export default router;
