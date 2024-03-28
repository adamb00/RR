import { FieldValues, useForm } from 'react-hook-form';
import UserInput from '@/ui/UserInteractions/UserInput';
import { useTranslation } from 'react-i18next';
import Button from '@/ui/Buttons/Button';

import { selectCurrentUser, updateUser as updateUserStore } from '@/features/Auth/slices/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IS_VALID_EMAIL, IS_VALID_PHONE_NUMBER } from '@/utils/helpers';
import { useUpdateUserMutation } from '@/features/Auth/slices/user/userApiSlice';

export default function UpdateUser() {
   const { control, handleSubmit } = useForm();
   const { t } = useTranslation();
   const user = useSelector(selectCurrentUser);
   const [updateUserAPI, { isLoading }] = useUpdateUserMutation();
   const dispatch = useDispatch();

   const updateUser = async (data: FieldValues) => {
      if (!data.email) data.email = user.email;
      if (!data.phone) data.phone = user.phone;
      const res = await updateUserAPI({ id: user._id, data }).unwrap();
      dispatch(updateUserStore({ ...res.data.data }));
   };

   // TODO PHONE VIEW

   return (
      <div className='update-user'>
         <form onSubmit={handleSubmit(updateUser)} className='update-user__form'>
            <h2 className='heading-secondary update-user__header'>{t('Update phone number')}</h2>
            <UserInput
               control={control}
               name='phone'
               className='update-user__input'
               fieldErrorClassname='update-user__form--error'
               placeholder='You can easily update your phone number'
               defaultValue={user.phone}
               rules={{
                  validate: {
                     matchPattern: (v: string) => {
                        if (v === '') {
                           return true;
                        } else {
                           return IS_VALID_PHONE_NUMBER(v);
                        }
                     },
                  },
               }}
            />
         </form>

         <form onSubmit={handleSubmit(updateUser)} className='update-user__form'>
            <h2 className='heading-secondary update-user__header'>{t('Update your e-mail address')}</h2>
            <UserInput
               control={control}
               name='email'
               className='update-user__input'
               placeholder='You can easily update your your e-mail address'
               defaultValue={user.email || ''}
               fieldErrorClassname='update-user__form--error'
               rules={{
                  //TODO ERROR FORDITASA
                  validate: {
                     matchPattern: (v: string) => {
                        if (v === '') {
                           return true;
                        } else {
                           return IS_VALID_EMAIL(v);
                        }
                     },
                  },
               }}
            />
         </form>
         <form onSubmit={handleSubmit(updateUser)} className='update-user__form'>
            <h2 className='heading-secondary update-user__header'>{t('Update your username')}</h2>
            <UserInput
               control={control}
               name='username'
               className='update-user__input'
               placeholder='You can easily update your your username'
               defaultValue={user.username || ''}
               fieldErrorClassname='update-user__form--error'
            />
         </form>
         <Button className='btn btn--tertiary update-user__btn' type='submit' onClick={handleSubmit(updateUser)}>
            {isLoading ? t('Uploading') : t('Upload')}
         </Button>
      </div>
   );
}
