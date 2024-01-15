import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';

const router: Router = Router();
const authController = new AuthController();
const userController = new UserController();

router.post('/signup', authController.signup);
router.get('/getReferralCode/:referralCode', authController.getReferralCode);
router.post('/signin', authController.signin);
// router.post('/signout', authController.signout);

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id/activate-account').patch(userController.updateOneUser);

export default router;
