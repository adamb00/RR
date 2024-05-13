import { InferSchemaType, Schema, CallbackError, model, Model } from 'mongoose';
import IUser from '../interfaces/IUser';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { linkSchema } from './LinkModel';
import crypto from 'crypto';
import slugify from 'slugify';
import ISocialLinks from '../interfaces/ISocialLinks';
import { systemNotificationSchema } from './SystemNotificationModel';

const SocialMediaSchema: Schema = new Schema<ISocialLinks>({
   platform: {
      type: String,
      required: true,
   },
   url: {
      type: String,
      required: true,
   },
});

const userSchema: Schema = new Schema<IUser>(
   {
      name: {
         type: String,
         required: [true, 'Please, provide us your full name.'],
      },
      email: {
         unique: true,
         lowercase: true,
         type: String,
         required: [true, 'Please, provide us, your email address.'],
         validate: [validator.isEmail, 'Please, provide a valid email address.'],
      },
      role: {
         type: String,
         default: 'User',
      },
      username: { type: String, unique: true },
      password: {
         type: String,
         minlength: 8,
         select: false,
         required: [true, 'Please provide a password'],
      },
      passwordConfirm: {
         type: String,
         required: [true, 'Please confirm your password'],
         validate: {
            validator: function (this: IUser, el: string) {
               return el === this.password;
            },
            message: 'Passwords are not the same!',
         },
      },
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
      birthday: { type: Date },
      availablePoints: {
         type: Number,
         default: 0,
      },
      createdAt: {
         type: Date,
         default: Date.now(),
      },
      nationality: {
         type: String,
      },
      referralCode: {
         type: Number,
      },
      level: {
         type: Number,
      },
      parent: {
         type: String,
      },
      children_level_1: {
         type: [String],
      },
      children_level_2: {
         type: [String],
      },
      children_level_3: {
         type: [String],
      },
      photo: {
         type: String,
      },
      active: {
         type: Boolean,
         default: false,
      },
      activationToken: {
         type: String,
      },
      activationTokenExpires: {
         type: Date,
      },
      notifications: [
         {
            read: { type: Boolean, default: false },
         },
      ],
      systemNotifications: {
         type: [systemNotificationSchema],
         default: [],
      },
      accumulatedPoints: {
         type: Number,
         default: 0,
      },
      availableLinks: {
         type: [linkSchema],
      },
      socialLinks: { type: [SocialMediaSchema] },
      phone: {
         type: String,
      },
      refreshToken: String,
   },
   { validateBeforeSave: false }
);

userSchema.pre<IUser>('save', function (next) {
   this.username = slugify(this.name + this.referralCode, { lower: true, replacement: '' });
   next();
});

userSchema.pre<IUser>('save', async function (next: (err?: CallbackError) => void): Promise<void> {
   if (!this.isModified('password')) return next();

   this.password = await bcrypt.hash(this.password as string, 12);
   this.passwordChangedAt = new Date(Date.now() - 1000);

   this.passwordConfirm = undefined;
   next();
});

userSchema.methods.createPasswordResetToken = function (): string {
   const resetToken = crypto.randomBytes(32).toString('hex');

   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

   return resetToken;
};

userSchema.methods.createActivationToken = function (): string {
   const activationToken = crypto.randomBytes(32).toString('hex');

   this.activationToken = crypto.createHash('sha256').update(activationToken).digest('hex');

   this.activationTokenExpires = Date.now() + 10 * 60 * 1000;

   return activationToken;
};

const User: Model<IUser> = model<IUser>('User', userSchema);
export type UserType = InferSchemaType<typeof userSchema>;
export default User;
