import { useOutsideClick } from '@/hooks/useOutsideClick';
import { MenuProps } from '@/interfaces/MenuProps';

import UserInput from '../UserInteractions/UserInput';
import { FieldValues, useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '@/features/Auth/slices/user/userApiSlice';
import { UserProfileData } from '@/interfaces/AuthInterfaces';

import { ViberIcon } from 'react-share';

import { SocialIcon } from 'react-social-icons';
import useDeviceDetection from '@/hooks/useDetectDevice';
import useDetectOrientation from '@/hooks/useDetectOrientation';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/features/Auth/slices/auth/authSlice';

interface SocialModalProps extends MenuProps {
   user: UserProfileData;
}

export default function SocialModal({ isOpen, setIsOpen, user }: SocialModalProps) {
   const handleCloseModal = () => setIsOpen(open => !open);
   const ref = useOutsideClick(handleCloseModal);
   const [updateUserAPI] = useUpdateUserMutation();
   const { socialLinks, _id } = user;
   const device = useDeviceDetection();
   const orientation = useDetectOrientation();
   const dispatch = useDispatch();

   const { handleSubmit, control } = useForm();

   const handleOnSubmit = async (data: FieldValues) => {
      const updatedData = Object.entries(data)
         /* eslint-disable-next-line */
         .filter(([_, url]) => url !== '')
         .map(([platform, url]) => ({
            platform,
            url,
         }));
      const res = await updateUserAPI({ data: { socialLinks: updatedData }, id: _id }).unwrap();
      console.log({ ...res.data.data });

      dispatch(updateUser({ ...res.data.data }));
   };

   const handleInputBlur = () => {
      handleSubmit(handleOnSubmit)();
   };

   const getStyleForDeviceAndOrientation = (device: string, orientation: string): React.CSSProperties => {
      if (device === 'Desktop' && orientation === 'landscape') {
         return { width: 35, height: 35 };
      } else if (device === 'Desktop') {
         return { width: 30, height: 30 };
      } else if (device === 'Tablet') {
         return { width: 30, height: 30 };
      } else {
         return { width: 30, height: 30 };
      }
   };

   const iconStyle = getStyleForDeviceAndOrientation(device, orientation);

   if (!isOpen) return;
   return (
      <div className='overlay'>
         <div className='social-modal' ref={ref}>
            <div className='close' onClick={handleCloseModal}>
               &#10005;
            </div>
            <h1 className='heading-primary'>Share your pages</h1>
            <div className='social-modal__body'>
               <div className='social-modal__group'>
                  <SocialIcon network='facebook' className='social-modal__input--icon' as='div' style={iconStyle} />
                  <UserInput
                     control={control}
                     name='facebook'
                     className='social-modal__input'
                     outterClassName='social-modal__input--outter'
                     onBlur={handleInputBlur}
                     defaultValue={socialLinks?.find(link => link.platform === 'facebook')?.url || ''}
                  />
               </div>
               <div className='social-modal__group'>
                  <SocialIcon network='youtube' className='social-modal__input--icon' as='div' style={iconStyle} />
                  <UserInput
                     control={control}
                     name='youtube'
                     className='social-modal__input'
                     outterClassName='social-modal__input--outter'
                     onBlur={handleInputBlur}
                     defaultValue={socialLinks?.find(link => link.platform === 'youtube')?.url || ''}
                  />
               </div>
               <div className='social-modal__group'>
                  <SocialIcon network='telegram' className='social-modal__input--icon' as='div' style={iconStyle} />
                  <UserInput
                     control={control}
                     name='telegram'
                     className='social-modal__input'
                     outterClassName='social-modal__input--outter'
                     onBlur={handleInputBlur}
                     defaultValue={socialLinks?.find(link => link.platform === 'telegram')?.url || ''}
                  />
               </div>
               <div className='social-modal__group'>
                  <ViberIcon className='social-modal__input--icon' style={iconStyle} />
                  <UserInput
                     control={control}
                     name='viber'
                     className='social-modal__input'
                     outterClassName='social-modal__input--outter'
                     onBlur={handleInputBlur}
                     defaultValue={socialLinks?.find(link => link.platform === 'viber')?.url || ''}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
