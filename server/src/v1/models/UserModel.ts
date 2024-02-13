import { InferSchemaType, Schema, CallbackError, model } from 'mongoose';
import IUser from '../interfaces/IUser';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { linkSchema } from './LinkModel';
import crypto from 'crypto';

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
            validator: function (this: UserType, el: string) {
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
      notifications: [
         {
            read: { type: Boolean, default: false },
         },
      ],
      accumulatedPoints: {
         type: Number,
         default: 0,
      },
      availableLinks: {
         type: [linkSchema],
      },
      refreshToken: String,
   },
   { validateBeforeSave: false }
);

userSchema.pre<UserType>('save', async function (this: UserType, next: (err?: CallbackError) => void): Promise<void> {
   if (!this.isModified('password')) return next();

   this.password = await bcrypt.hash(this.password, 12);
   this.passwordChangedAt = Date.now() - 1000;

   this.passwordConfirm = undefined;
   next();
});

userSchema.methods.createPasswordResetToken = function (this: UserType): string {
   const resetToken = crypto.randomBytes(32).toString('hex');

   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

   return resetToken;
};

const User = model<IUser>('User', userSchema);
export type UserType = InferSchemaType<typeof userSchema>;
export default User;
