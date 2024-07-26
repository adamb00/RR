import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetUsersMutation, useUpdateUserMutation } from '@/features/Reseller/userApiSlice';

import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import { UserProfileData } from '@/interfaces/IUser';
import { handleCopy } from '@/utils/helper';
import { IoCopyOutline } from 'react-icons/io5';
import UserInput from '../UserInteractions/UserInput';
import { FieldValues, useForm } from 'react-hook-form';
import { useCreateSystemNotificationMutation } from '@/features/Notifications/notificationApislice';
import { useCreateTransactionMutation } from '@/features/Transactions/transactionsApiSlice';

const Table = () => {
   const [getUsers] = useGetUsersMutation();
   const [updateUser] = useUpdateUserMutation();
   const [data, setData] = useState<UserProfileData[]>([]);
   const { control, handleSubmit, resetField, reset } = useForm();
   const [createSystemNotification] = useCreateSystemNotificationMutation();
   const [createTransaction] = useCreateTransactionMutation();

   const fetchUsers = useCallback(async () => {
      try {
         const result = await getUsers({}).unwrap();
         setData(result.doc);
      } catch (error) {
         console.error('Failed to fetch users: ', error);
      }
   }, [getUsers]);

   useEffect(() => {
      fetchUsers();
      const interval = setInterval(() => {
         fetchUsers();
      }, 300000);

      return () => clearInterval(interval);
   }, [fetchUsers]);

   const getCurrentUserPoints = async (id: string) => {
      return data.find(user => user._id === id)?.availablePoints;
   };

   const handleSubmitPoints = async (formData: FieldValues, userData: UserProfileData) => {
      const currentUserPoints = (await getCurrentUserPoints(userData._id)) as number;

      const data = { hasActiveAsk: false, availablePoints: currentUserPoints - +formData.points };
      await updateUser({ id: userData._id, data }).unwrap();
      resetField('points');
      reset();

      const notification = { notification: `${+formData.points}$ jóváírását megkezdtük. Ez eltarthat egy darabig.` };

      await createSystemNotification({ id: userData._id, notification }).unwrap();

      const transactionData = {
         requestTime: userData.lastAsk,
         fulfillTime: Date.now(),
         userID: userData._id,
         userEmail: userData.email,
         amount: +formData.points,
         wallet: userData.trc,
         type: 'CashoutUser',
      };

      await createTransaction(transactionData).unwrap();

      fetchUsers();
   };

   const columns = useMemo<ColumnDef<UserProfileData>[]>(
      () => [
         {
            accessorKey: 'referralCode',
            header: 'ID',
            cell: props => <p>{props.getValue<string>()}</p>,
         },
         { accessorKey: 'email', header: 'E-mail', cell: props => <p>{props.getValue<string>()}</p> },
         {
            accessorKey: 'availablePoints',
            header: 'Elérhető pontok',
            cell: props => <p>{props.getValue<number>().toFixed(1)}</p>,
         },
         {
            accessorKey: 'trc',
            header: 'TRC20',
            cell: props => (
               <div>
                  {props.getValue<string>() && (
                     <p
                        className='table__trc'
                        onClick={() => {
                           handleCopy(props.getValue<string>());
                        }}
                     >
                        {props.getValue<string>()} <IoCopyOutline />
                     </p>
                  )}
               </div>
            ),
         },
      ],
      []
   );

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <table className='table'>
         <thead className='table__head'>
            {table.getHeaderGroups().map(headerGroup => {
               return (
                  <tr className='table__row' key={headerGroup.id}>
                     {headerGroup.headers.map(header => (
                        <th className='table__header' key={header.id} colSpan={header.colSpan}>
                           {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                     ))}
                  </tr>
               );
            })}
         </thead>
         <tbody className='table__body'>
            {table.getRowModel().rows.map(row => (
               <tr className={`table__row ${row.original.availablePoints > 20 && 'table__row--active'}`} key={row.id}>
                  {row.getVisibleCells().map(cell => (
                     <td className='table__data' key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                     </td>
                  ))}
                  {row.original.availablePoints > 20 && (
                     <td>
                        <UserInput
                           control={control}
                           name='points'
                           label=''
                           className='table__input'
                           max={row.original.availablePoints}
                        />
                        <button
                           onClick={handleSubmit(data => handleSubmitPoints(data, row.original))}
                           className='table__button'
                        ></button>
                     </td>
                  )}
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default Table;
