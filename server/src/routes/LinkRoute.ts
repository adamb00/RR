import { Router } from 'express';
import LinkController from '../controllers/LinkController';
import authenticateUser from '../middlewares/authenticateUser';
import restrictTo from '../middlewares/restrictTo';
import { deleteUsersLink, getCurrentUser } from '../controllers/UserController';

const router: Router = Router();
const linkController = new LinkController();

router.route('/').get(linkController.getAllLinks).post(restrictTo('Admin'), linkController.createLink);
router
   .route('/:id')
   .get(linkController.getOneLink)
   .patch(linkController.updateOneLink)
   .delete(deleteUsersLink, linkController.deleteOneLink);

export default router;
