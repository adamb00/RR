import { Router } from 'express';
import NotificationController, { createNotification } from '../controllers/NotificationController';
import authenticateUser from '../middlewares/authenticateUser';
import restrictTo from '../middlewares/restrictTo';

const router: Router = Router();
const notificationController = new NotificationController();

router.use(authenticateUser);

router.route('/').get(notificationController.getAllNotifications).post(createNotification);

router
   .route('/:id')
   .get(notificationController.getOneNotification)
   .patch(restrictTo('Admin'), notificationController.updateOneNotification);

export default router;
