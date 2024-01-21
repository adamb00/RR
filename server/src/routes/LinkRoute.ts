import { Router } from 'express';
import LinkController from '../controllers/LinkController';
import authenticateUser from '../middlewares/authenticateUser';
import restrictTo from '../middlewares/restrictTo';

const router: Router = Router();
const linkController = new LinkController();

router.use(authenticateUser);

router.route('/').get(linkController.getAllLinks).post(restrictTo('Admin'), linkController.createLink);
router.route('/:id').delete(linkController.deleteOneLink);

export default router;
