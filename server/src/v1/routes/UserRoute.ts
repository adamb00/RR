import { Router } from 'express';

import UserController, {
   getCurrentUser,
   markNotifications,
   markNotification,
   activateUser,
   getUserImage,
   updateMe,
} from '../controllers/UserController';
import authenticateUser from '../middlewares/authenticateUser';
import { resizeImage } from '../middlewares/uploadImage';

const router: Router = Router();
const userController = new UserController();

router.get('/current-user', authenticateUser, getCurrentUser);
router.patch('/mark-notifications', authenticateUser, markNotifications);
router.patch('/mark-one-notification', authenticateUser, markNotification);

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getOneUser).patch(userController.updateOneUser);

router.post('/upload-image', userController.uploadImage, resizeImage(300), authenticateUser, updateMe);
router.get('/get-image/:key', authenticateUser, getUserImage);
export default router;
