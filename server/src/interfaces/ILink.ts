import { Document } from 'mongoose';

export default interface ILink extends Document {
   link: string;
   createdAt: Date;
   title?: string;
   active: boolean;
   order: number;
   image: string;
   isPreview: boolean;
   description: string;
   createdBy: string;
}
