import { useGetOneUserMutation, useUpdateUserMutation } from '@/features/Reseller/userApiSlice';
import { UserProfileData } from '@/interfaces/IUser';
import { useCallback, useEffect, useState } from 'react';
import UserInput from '../UserInteractions/UserInput';
import { FieldValues, useForm } from 'react-hook-form';
import { IoCopyOutline } from 'react-icons/io5';
import { handleCopy } from '@/utils/helper';
import { useCreateTransactionMutation } from '@/features/Transactions/transactionsApiSlice';

export default function Adam() {
   const [getOneUser] = useGetOneUserMutation();
   const [updateUser] = useUpdateUserMutation();
   const [data, setData] = useState<UserProfileData>();
   const [createTransaction] = useCreateTransactionMutation();

   const { control, resetField, handleSubmit, reset } = useForm();
   const currentPoints = data?.adamPoints as number;
   const id = data?._id as string;
   const wallet = data?.trc as string;

   const fetchUsers = useCallback(async () => {
      try {
         // const result = await getOneUser('661961155367cdafaead01a7').unwrap(); // DEV
         const result = await getOneUser('667d106abd4b08028018e9ca').unwrap(); // PROD
         setData(result.user);
      } catch (error) {
         console.error('Failed to fetch users: ', error);
      }
   }, [getOneUser]);

   const handleSubmitPoints = async (formData: FieldValues, id: string) => {
      const data = { adamPoints: +currentPoints - +formData.points };
      await updateUser({ id, data }).unwrap();

      resetField('points');
      reset();

      const transactionData = {
         fulfillTime: Date.now(),
         userID: id,
         userEmail: 'borsodi.dm@gmail.com',
         amount: +formData.points,
         wallet,
         type: 'CashoutAdam',
      };

      await createTransaction(transactionData).unwrap();

      fetchUsers();
   };

   useEffect(() => {
      fetchUsers();
      const interval = setInterval(() => {
         fetchUsers();
      }, 300000);

      return () => clearInterval(interval);
   }, [fetchUsers]);
   return (
      <table className='table'>
         <thead className='table__head'>
            <tr className='table__row'>
               <th className='table__header'>ID</th>
               <th className='table__header'>E-mail</th>
               <th className='table__header'>Elérhető pontok</th>
               <th className='table__header'>TRC20</th>
            </tr>
         </thead>
         <tbody className='table__body'>
            <tr className='table__row'>
               <td className='table__data'>{data?._id}</td>
               <td className='table__data'>{data?.email}</td>
               <td className='table__data'>{data?.adamPoints}</td>
               <td className='table__data table__trc' onClick={() => handleCopy(data!.trc)}>
                  {data?.trc} <IoCopyOutline />
               </td>
               <td>
                  <UserInput control={control} name='points' label='' className='table__input' max={data?.adamPoints} />
                  <button
                     onClick={handleSubmit(data => handleSubmitPoints(data, id))}
                     className='table__button'
                  ></button>
               </td>
            </tr>
         </tbody>
      </table>
   );
}
