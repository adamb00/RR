import User from '../models/UserModel';
import * as handler from './../utils/handleControllers';

export default class UserController {
   public getAllUsers = handler.getAll(User);
   public getOneUser = handler.getOne(User);
   public createUser = handler.createOne(User);
   public updateOneUser = handler.updateOne(User);
}
