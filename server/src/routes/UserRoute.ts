import { Router } from 'express';

import UserController, {
   getCurrentUser,
   markNotifications,
   markNotification,
   updateMe,
   deleteAllNotifications,
   updatePassword,
   deleteSystemNotifications,
} from '../controllers/UserController';
import authenticateUser from '../middlewares/authenticateUser';
import { resizeImage } from '../middlewares/uploadImage';
import { getImage } from '../middlewares/getImage';

const router: Router = Router();
const userController = new UserController();

router.post('/update-password', authenticateUser, updatePassword);
router.post('/mark-notifications', authenticateUser, markNotifications);
router.post('/mark-one-notification', authenticateUser, markNotification);
router.post('/delete-notifications', authenticateUser, deleteAllNotifications);
router.post('/delete-system_notifications', authenticateUser, deleteSystemNotifications);

router.post('/upload-image', userController.uploadImage, resizeImage(300), authenticateUser, updateMe);
router.get('/current-user', authenticateUser, getCurrentUser);
router.get('/get-image/:key', getImage);

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:param/:value').get(userController.getOneUser).patch(userController.updateOneUser);

export default router;
