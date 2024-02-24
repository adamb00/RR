import { FieldValues, useForm } from 'react-hook-form';
import UserInput from '../../ui/UserInteractions/UserInput';
import Button from '../../ui/Buttons/Button';

import { emptyInputField } from '../../utils/helpers';
import RichText from '../../ui/UserInteractions/RichText';
import { memo } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Auth/slices/auth/authSlice';
// import { BASE_URL_SOCKET } from '../../utils/constants';

export default memo(function NotificationsAdmin() {
   const { control, handleSubmit } = useForm();

   const socket = io(import.meta.env.VITE_BASE_URL_SOCKET);
   const user = useSelector(selectCurrentUser);

   const handleOnSubmit = (data: FieldValues) => {
      const notifications = {
         ...data,
         created_at: Date.now(),
      };

      socket.emit('send_message', { ...notifications, created_by: user.name });
      emptyInputField('.notifications__richtext--input');
      emptyInputField('.notifications__admin--input');
   };
   return (
      <>
         <div className='notifications__admin'>
            <h1 className='heading-primary'>Send notifications easily</h1>
            <form action='' onSubmit={handleSubmit(handleOnSubmit)} className='notifications__admin--form'>
               <UserInput
                  name='title'
                  control={control}
                  className='notifications__admin--input'
                  placeholder='Please add a title to the notification..'
                  fieldErrorClassname='notifications__admin--error'
                  rules={{
                     required: {
                        value: true,
                        message: 'Notifications must have a title',
                     },
                  }}
               />

               <div className='notifications__richtext'>
                  <RichText
                     control={control}
                     name='message'
                     className='notifications__richtext--input'
                     fieldErrorClassname='notifications__richtext--error'
                     placeholder='You can type any message here'
                     rules={{
                        required: {
                           value: true,
                           message: 'Notifications must have a message',
                        },
                     }}
                  />
               </div>
               <Button onClick={handleSubmit(handleOnSubmit)} className='btn btn--primary notifications__admin--button'>
                  Submit
               </Button>
            </form>
         </div>
         {/* <NotificationsTable /> */}
      </>
   );
});
