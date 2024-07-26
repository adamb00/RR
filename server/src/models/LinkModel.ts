import { InferSchemaType, Schema, model } from 'mongoose';
import ILink from '../interfaces/ILink';
import env from '../utils/validateEnv';

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
         default: 1,
      },
      createdBy: {
         type: String,
      },
      description: {
         type: String,
      },
      isPreview: {
         type: Boolean,
      },
      isModify: {
         type: Boolean,
         default: true,
      },
      video: String,
      images: {
         type: [String],
         default: [`https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/r2fittshop-logo.png`],
      },
   },

   {
      versionKey: false,
   }
);

const Link = model<ILink>('Link', linkSchema);
export type LinkType = InferSchemaType<typeof linkSchema>;

export default Link;
