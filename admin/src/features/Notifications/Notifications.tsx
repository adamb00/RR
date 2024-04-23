import Button from '@/ui/Buttons/Button';
import UserInput from '@/ui/UserInteractions/UserInput';
import UserRichText from '@/ui/UserInteractions/UserRichText';
import { FieldValues, useForm } from 'react-hook-form';
import { useCreateNotificationMutation } from './notificationApislice';
import { socket } from '@/utils/constants';

export default function Notifications() {
   const [createNotification, { isLoading }] = useCreateNotificationMutation();
   const handleOnSubmit = async (data: FieldValues) => {
      const notification = {
         created_at: new Date(Date.now()),
         ...data,
      };
      const res = await createNotification(notification).unwrap();
      console.log(res);
      socket.emit('notification', res.doc);
   };
   const { control, handleSubmit } = useForm();

   return (
      <>
         <div className='notifications'>
            <form action='' onSubmit={handleSubmit(handleOnSubmit)} className='notifications__form'>
               <UserInput
                  label='Értesítés címe'
                  name='title'
                  control={control}
                  placeholder='Adj meg egy címet az értesítéshez..'
               />

               <div className='notifications__richtext'>
                  <UserRichText
                     control={control}
                     name='message'
                     className='notifications__richtext--input'
                     placeholder='Értesítés szövege..'
                  />
               </div>
               <Button type='submit' className='btn' disabled={isLoading}>
                  Küldés
               </Button>
            </form>
         </div>
      </>
   );
}
