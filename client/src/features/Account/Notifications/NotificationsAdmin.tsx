import { FieldValues, useForm } from 'react-hook-form';
import UserInput from '../../../ui/UserInteractions/UserInput';
import UserTextArea from '../../../ui/UserInteractions/UserTextArea';
import Button from '../../../ui/Buttons/Button';

import { useSendNotification } from '../../Auth/useUserAuth';
import { emptyInputField } from '../../../utils/helpers';
// import NotificationsTable from './NotificationsTable';

export default function NotificationsAdmin() {
   const { control, handleSubmit } = useForm();
   const { sendNotification, isSending } = useSendNotification();

   const handleOnSubmit = (data: FieldValues) => {
      const messageWithPlaceholder = data.message.replace(/\n/g, '<br>');

      const notifications = {
         notifications: { ...data, message: messageWithPlaceholder, created_at: Date.now() },
      };
      sendNotification({ ...notifications });
      emptyInputField('.notifications__admin--textarea');
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

               <UserTextArea
                  name='message'
                  control={control}
                  className='notifications__admin--textarea'
                  fieldErrorClassname='notifications__admin--error'
                  placeholder='You can type any message here'
                  rules={{
                     required: {
                        value: true,
                        message: 'Notifications must have a message',
                     },
                  }}
               />
               <Button
                  onClick={handleSubmit(handleOnSubmit)}
                  disabled={isSending}
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
