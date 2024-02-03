import { FieldValues, useForm } from 'react-hook-form';
import UserInput from '../../ui/UserInteractions/UserInput';
import Button from '../../ui/Buttons/Button';

import { emptyInputField } from '../../utils/helpers';
import { useCreateNotification } from './useNotifications';
import RichText from '../../ui/UserInteractions/RichText';

export default function NotificationsAdmin() {
   const { control, handleSubmit } = useForm();

   const { isCreating, createNotification } = useCreateNotification();

   const handleOnSubmit = (data: FieldValues) => {
      const notifications = {
         ...data,
         created_at: Date.now(),
      };

      createNotification({ ...notifications });
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
               <Button
                  onClick={handleSubmit(handleOnSubmit)}
                  // disabled={isSending}
                  disabled={isCreating}
                  className='btn btn--primary notifications__admin--button'
               >
                  Submit
               </Button>
            </form>
         </div>
         {/* <NotificationsTable /> */}
      </>
   );
}
