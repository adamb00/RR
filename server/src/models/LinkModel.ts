import { InferSchemaType, Schema, model } from 'mongoose';
import ILink from '../interfaces/ILink';

export const linkSchema: Schema = new Schema<ILink>(
   {
      link: {
         type: String,
      },
      createdAt: {
         type: Date,
         default: Date.now(),
      },
      active: {
         type: Boolean,
         default: false,
      },
      title: {
         type: String,
      },
      order: {
         type: Number,
         default: 0,
      },
   },

   {
      versionKey: false,
   }
);

const Link = model<ILink>('Link', linkSchema);
export type LinkType = InferSchemaType<typeof linkSchema>;

export default Link;
