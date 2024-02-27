import { Router } from 'express';
import NotificationController from '../controllers/NotificationController';
import authenticateUser from '../middlewares/authenticateUser';
import restrictTo from '../middlewares/restrictTo';

const router: Router = Router();
const notificationController = new NotificationController();

router.use(authenticateUser);

// router.route('/').get(notificationController.getAllNotifications).post(restrictTo('Admin'), createNotification);
router.route('/').get(notificationController.getAllNotifications);

router
   .route('/:id')
   .get(notificationController.getOneNotification)
   .patch(restrictTo('Admin'), notificationController.updateOneNotification);

export default router;
