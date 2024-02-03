import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   getOneUser as getOneUserFn,
   updateOneUser as updateOneUserFn,
   sendNotification as sendNotificationFn,
   updateAllNotificiations as updateAllNotificiationsFn,
   updateOneNotification as updateOneNotificationFn,
} from '../../services/apiUser';

interface MutationParams {
   id: string;
   data: object;
}

export const useGetOneUser = (id: string) => {
   const {
      isLoading,
      data: currentUser,
      error,
   } = useQuery({
      queryKey: ['user', id],
      queryFn: () => getOneUserFn(id),
   });

   return { isLoading, currentUser, error };
};

export const useUpdateUser = () => {
   const queryClient = useQueryClient();

   const { mutate: updateUser, isLoading: isUpdating } = useMutation({
      mutationFn: (mutateParams: MutationParams) => updateOneUserFn(mutateParams),
      onSuccess: user => {
         console.log(user);
         queryClient.setQueryData(['user'], user.data.data);
      },
   });

   return { updateUser, isUpdating };
};

export const useSendNotification = () => {
   const queryClient = useQueryClient();

   const { mutate: sendNotification, isLoading: isSending } = useMutation({
      mutationFn: (notification: object) => sendNotificationFn(notification),
      onSuccess: user => {
         queryClient.setQueryData(['user'], user.data.data);
      },
   });

   return { sendNotification, isSending };
};

export const useMarkNotifications = () => {
   const queryClient = useQueryClient();

   const { mutate: updateNotifications, isLoading: isUpdating } = useMutation({
      mutationFn: updateAllNotificiationsFn,
      onSuccess: user => {
         console.log(user);
         queryClient.setQueryData(['user'], user.data.data);
      },
   });

   return { updateNotifications, isUpdating };
};

export const useMarkNotification = () => {
   const { mutate: updateOneNotification, isLoading: isUpdatingNotification } = useMutation({
      mutationFn: (id: string) => updateOneNotificationFn(id),
   });

   return { updateOneNotification, isUpdatingNotification };
};
