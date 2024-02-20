import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router: Router = Router();
const authController = new AuthController();

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/signout', authController.signout);
router.get('/refresh', authController.handleRefreshToken);
router.get('/get-referralCode/:referralCode', authController.getReferralCode);
router.get('/activate-account/:token', authController.activateUser);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

export default router;
