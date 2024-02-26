import { Router } from 'express';
import LinkController from '../controllers/LinkController';
import authenticateUser from '../middlewares/authenticateUser';
import restrictTo from '../middlewares/restrictTo';
import { deleteUsersLink } from '../controllers/UserController';

const router: Router = Router();
const linkController = new LinkController();

router
   .route('/')
   .get(linkController.getAllLinks)
   .post(authenticateUser, restrictTo('Admin'), linkController.createLink);
router
   .route('/:id')
   .get(linkController.getOneLink)
   .patch(linkController.updateOneLink)
   .delete(deleteUsersLink, linkController.deleteOneLink);

export default router;
