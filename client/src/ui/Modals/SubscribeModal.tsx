import { useOutsideClick } from '@/hooks/useOutsideClick';
import { UserProfileData } from '@/interfaces/AuthInterfaces';
import { MenuProps } from '@/interfaces/MenuProps';
import UserInput from '../UserInteractions/UserInput';
import { FieldValues, useForm } from 'react-hook-form';
import FormIcon from '../FormIcon';
import { useTranslation } from 'react-i18next';
import { CiMail } from 'react-icons/ci';
import UserCheckboxInput from '../UserInteractions/UserCheckboxInput';
import Button from '../Buttons/Button';
import { useSubscribeMutation } from '@/features/Links/subscibeApiSlice';
import { userImage } from '@/utils/helpers';

interface SubscribeModalProps extends MenuProps {
   user: UserProfileData;
}

export default function SubscribeModal({ setIsOpen, isOpen, user }: SubscribeModalProps) {
   const handleCloseModal = () => {
      setIsOpen(open => !open);
   };
   const { t } = useTranslation();

   const ref = useOutsideClick(handleCloseModal);
   const { username } = user;
   const { control, handleSubmit, watch } = useForm();
   const [subscribe] = useSubscribeMutation();

   const handleOnSubmit = async (data: FieldValues) => {
      await subscribe(data).unwrap();
      handleCloseModal();
   };
   const accepted = watch('accept');

   if (!isOpen) return;

   return (
      <div className='overlay'>
         <div className='subscribe-modal' ref={ref}>
            <div className='close close--dark' onClick={handleCloseModal}>
               &#10005;
            </div>
            <img src={userImage(user.photo)} alt='User Image' className='subscribe-modal__image' />
            <h2 className='heading-primary--small'>Subscribe to @{username}</h2>

            <form className='subscribe-modal__form'>
               <UserInput
                  className='subscribe-modal__form--input'
                  control={control}
                  name='email'
                  placeholder='Please provide use Your e-mail'
               >
                  <FormIcon tooltip={t('Enter Your e-mail address')}>
                     <CiMail className='subscribe-modal__form--icon' />
                  </FormIcon>
               </UserInput>
               <div className='subscribe-modal__form--checkbox'>
                  <UserCheckboxInput
                     control={control}
                     name='accept'
                     defaultChecked={false}
                     outterClassName='subscribe-modal__form--input__checkbox'
                  >
                     I agree to R2BYou's Terms and Conditions and Privacy Notice.
                  </UserCheckboxInput>
               </div>
            </form>

            <Button className='btn btn--secondary' disabled={!accepted} onClick={handleSubmit(handleOnSubmit)}>
               Subscribe
            </Button>
         </div>
      </div>
   );
}
