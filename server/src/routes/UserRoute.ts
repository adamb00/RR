import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../interfaces/UserController';

const router: Router = Router();
const authController = new AuthController();
const userController = new UserController();

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/signout', authController.signout);
router.get('/getReferralCode/:referralCode', authController.getReferralCode);

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getOneUser);
router.route('/:id/activate-account').patch(userController.updateOneUser);

export default router;
