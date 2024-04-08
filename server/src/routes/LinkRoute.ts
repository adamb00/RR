import { Router } from 'express';
import LinkController, { updateLink } from '../controllers/LinkController';
import authenticateUser from '../middlewares/authenticateUser';
import restrictTo from '../middlewares/restrictTo';
import { deleteUsersLink } from '../controllers/UserController';
import { resizeImage } from '../middlewares/uploadImage';
import { getImage } from '../middlewares/getImage';

const router: Router = Router();
const linkController = new LinkController();

router.route('/').get(linkController.getAllLinks);
router.route('/create-link').post(linkController.createLink);

router
   .route('/:id')
   .get(linkController.getOneLink)
   .patch(linkController.updateOneLink)
   .delete(deleteUsersLink, linkController.deleteOneLink);

router.route('/:id/activate-link').patch(linkController.activateLink);

router.post('/:id/upload-image', linkController.uploadImage, resizeImage(1000), updateLink);

export default router;
