import { Document } from 'mongoose';

export default interface ILink extends Document {
   link: string;
   createdAt: Date;
}
