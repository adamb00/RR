import { useOutsideClick } from '@/hooks/useOutsideClick';
import { MenuProps } from '@/interfaces/MenuProps';
import { FieldValues, useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '@/features/Auth/slices/user/userApiSlice';
import { UserProfileData } from '@/interfaces/AuthInterfaces';

import { useDispatch } from 'react-redux';
import { updateUser } from '@/features/Auth/slices/auth/authSlice';
import Button from '../Buttons/Button';
import SocialInput from '../UserInteractions/SocialInput';

interface SocialModalProps extends MenuProps {
   user: UserProfileData;
}

export default function SocialModal({ isOpen, setIsOpen, user }: SocialModalProps) {
   const handleCloseModal = () => setIsOpen(open => !open);
   const ref = useOutsideClick(handleCloseModal);
   const [updateUserAPI] = useUpdateUserMutation();
   const { socialLinks, _id } = user;

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

   if (!isOpen) return;
   return (
      <div className='overlay'>
         <div className='social-modal' ref={ref}>
            <div className='close' onClick={handleCloseModal}>
               &#10005;
            </div>
            <h1 className='heading-primary'>Share your pages</h1>
            <div className='social-modal__body'>
               <SocialInput
                  control={control}
                  name='instagram'
                  defaultValue={socialLinks?.find(link => link.platform === 'instagram')?.url || ''}
               />
               <SocialInput
                  control={control}
                  name='telegram'
                  defaultValue={socialLinks?.find(link => link.platform === 'telegram')?.url || ''}
               />
               <SocialInput
                  control={control}
                  name='youtube'
                  defaultValue={socialLinks?.find(link => link.platform === 'youtube')?.url || ''}
               />
               <SocialInput
                  control={control}
                  name='facebook'
                  defaultValue={socialLinks?.find(link => link.platform === 'facebook')?.url || ''}
               />
            </div>
            <Button className='btn btn--primary' onClick={handleSubmit(handleOnSubmit)}>
               Submit
            </Button>
         </div>
      </div>
   );
}
