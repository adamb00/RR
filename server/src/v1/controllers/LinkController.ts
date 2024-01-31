import Link from '../models/LinkModel';
import * as handler from './../utils/handleControllers';

export default class UserController {
   public getAllLinks = handler.getAll(Link);
   public getOneLink = handler.getOne(Link);
   public createLink = handler.createOne(Link);
   public updateOneLink = handler.updateOne(Link);
   public deleteOneLink = handler.deleteOne(Link);
}
