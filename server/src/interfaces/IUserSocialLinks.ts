import { Document } from 'mongoose';

export default interface IUserSocialLinks extends Document {
   platform: string;
   url: string;
   default: boolean;
}
