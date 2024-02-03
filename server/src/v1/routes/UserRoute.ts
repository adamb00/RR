import { Router } from 'express';
// import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';

import { getCurrentUser, markNotifications, markNotification } from '../controllers/UserController';
import authenticateUser from '../middlewares/authenticateUser';

const router: Router = Router();
// const authController = new AuthController();
const userController = new UserController();

// router.post('/signin', authController.signin);
// router.post('/signup', authController.signup);
// router.post('/signout', authController.signout);
// router.get('/getReferralCode/:referralCode', authController.getReferralCode);

router.get('/current-user', authenticateUser, getCurrentUser);
router.patch('/mark-notifications', authenticateUser, markNotifications);
router.patch('/mark-one-notification', authenticateUser, markNotification);

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getOneUser).patch(userController.updateOneUser);
router.route('/:id/activate-account').patch(userController.updateOneUser);

export default router;
