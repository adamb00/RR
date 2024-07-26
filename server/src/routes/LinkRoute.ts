import { Router } from 'express';
import LinkController, { updateLink, updateLinkVideo } from '../controllers/LinkController';
import { deleteUsersLink } from '../controllers/UserController';
import { resizeImage, uploadVideo } from '../middlewares/uploadImage';
import { resizeMultipleImage } from '../middlewares/uploadMultipleImages';

const router: Router = Router();
const linkController = new LinkController();

router.route('/').get(linkController.getAllLinks).post(linkController.createLink);

router
   .route('/:id')
   .get(linkController.getOneLink)
   .patch(linkController.updateOneLink)
   .delete(deleteUsersLink, linkController.deleteOneLink);

router.route('/:id/activate-link').patch(linkController.activateLink);

router.post('/:id/upload-image', linkController.uploadImage, resizeImage(1000), updateLink);
router.post('/:id/upload-video', linkController.uploadVideo, uploadVideo(), updateLinkVideo);
router.post('/:id/upload-images', linkController.uploadImages, resizeMultipleImage(1000), updateLink);

export default router;
