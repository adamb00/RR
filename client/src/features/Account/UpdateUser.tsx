import { FieldValues, useForm } from 'react-hook-form';
import UserInput from '@/ui/UserInteractions/UserInput';
// import { useTranslation } from 'react-i18next';
import Button from '@/ui/Buttons/Button';

import { selectCurrentUser, updateUser as updateUserStore } from '@/features/Auth/slices/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IS_VALID_EMAIL, IS_VALID_PHONE_NUMBER, IS_VALID_TRON } from '@/utils/helpers';
import { useUpdateUserMutation } from '@/features/Auth/slices/user/userApiSlice';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Information from '@/ui/Information';

export default function UpdateUser() {
   const { control, handleSubmit } = useForm();
   // const { t } = useTranslation();
   const user = useSelector(selectCurrentUser);
   const [updateUserAPI, { isLoading }] = useUpdateUserMutation();
   const dispatch = useDispatch();

   const location = useLocation();
   const trc20Ref = useRef<HTMLFormElement>(null);

   const updateUser = async (data: FieldValues) => {
      if (!data.email) data.email = user.email;
      if (!data.phone) data.phone = user.phone;
      const res = await updateUserAPI({ id: user._id, data }).unwrap();
      dispatch(updateUserStore({ ...res.data.data }));
   };

   useEffect(() => {
      if (location.hash === '#trc20') {
         trc20Ref.current?.scrollIntoView({ behavior: 'smooth' });
      }
   }, [location]);

   // TODO PHONE VIEW

   return (
      <div className='update-user'>
         <form onSubmit={handleSubmit(updateUser)} className='update-user__form'>
            <h2 className='heading-secondary update-user__header'>Telefonszám módosítása</h2>
            {/* <h2 className='heading-secondary update-user__header'>{t('Update phone number')}</h2> */}
            <UserInput
               control={control}
               name='phone'
               className='update-user__input'
               fieldErrorClassname='update-user__form--error'
               placeholder='Kérjük add meg a telefonszámod'
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
            <h2 className='heading-secondary update-user__header'>E-mail cím módosítása</h2>
            {/* <h2 className='heading-secondary update-user__header'>{t('Update your e-mail address')}</h2> */}
            <UserInput
               control={control}
               name='email'
               className='update-user__input'
               placeholder='Kérjük add meg az e-mail címed'
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
            <h2 className='heading-secondary update-user__header'>Felhasználónév módosítása</h2>
            {/* <h2 className='heading-secondary update-user__header'>{t('Update your username')}</h2> */}
            <Information
               cont={'Felhasználónév, hogy könnyebben megtalálhassanak.'}
               className='update-user__information'
            />

            <UserInput
               control={control}
               name='username'
               className='update-user__input'
               placeholder='Kérjük add meg a felhasználóneved'
               defaultValue={user.username || ''}
               fieldErrorClassname='update-user__form--error'
            />
         </form>
         <form onSubmit={handleSubmit(updateUser)} className='update-user__form'>
            <h2 className='heading-secondary update-user__header'>Bemutatkozó szöveg</h2>
            <Information
               cont={'Bemutatkozó szöveg a megosztott linkekhez. Maximum 100 karakter engedélyezett.'}
               className='update-user__information'
            />

            <UserInput
               control={control}
               name='description'
               className='update-user__input'
               placeholder='Bemutatkozó szöveg megadása'
               maxLength={100}
               max={100}
               defaultValue={user.description || ''}
               fieldErrorClassname='update-user__form--error'
               rules={{
                  maxLength: 100,
               }}
            />
         </form>

         <form className='update-user__form' id='trc20' ref={trc20Ref}>
            <h2 className='heading-secondary update-user__header'>TRC20 tárca megadása</h2>
            <Information cont={'Kiutaláshoz szükséges TRC20 tárca címe.'} className='update-user__information' />

            {/* <h2 className='heading-secondary update-user__header'>Update your TRC20 wallet</h2> */}
            <UserInput
               control={control}
               name='trc'
               className='update-user__input'
               placeholder='Kérjük add meg TRC20 tárcád címét'
               defaultValue={user.trc || ''}
               fieldErrorClassname='update-user__form--error'
               rules={{
                  validate: {
                     matchPattern: (v: string) => {
                        if (v === '') {
                           return true;
                        } else {
                           return IS_VALID_TRON(v);
                        }
                     },
                  },
               }}
            />
         </form>
         <Button className='btn btn--tertiary update-user__btn' type='submit' onClick={handleSubmit(updateUser)}>
            {/* {isLoading ? t('Uploading') : t('Upload')} */}
            {isLoading ? 'Frissítés alatt' : 'Frissítés'}
         </Button>
      </div>
   );
}
