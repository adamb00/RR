import { Router } from 'express';
import NotificationController, {
   createNotification,
   createSystemNotification,
} from '../controllers/NotificationController';
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

router.route('/add-system-notification/:id').patch(createSystemNotification);

export default router;
