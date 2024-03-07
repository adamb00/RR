import { Router } from 'express';
import LinkController, { getLinkImage, updateLink } from '../controllers/LinkController';
import authenticateUser from '../middlewares/authenticateUser';
import restrictTo from '../middlewares/restrictTo';
import { deleteUsersLink } from '../controllers/UserController';
import { resizeImage } from '../middlewares/uploadImage';

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

router.post('/:id/upload-image', linkController.uploadImage, resizeImage(4000), updateLink);
router.get('/get-image/:key', getLinkImage);

export default router;
