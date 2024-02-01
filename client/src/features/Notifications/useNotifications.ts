import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   createNotification as createNotificationFn,
   getAllNotifications as getAllNotificationsFn,
   getOneNotification as getOneNotificationFn,
} from '../../services/apiNotifications';

export const useCreateNotification = () => {
   const queryClient = useQueryClient();
   const {
      mutate: createNotification,
      isLoading: isCreating,
      error,
   } = useMutation({
      mutationFn: createNotificationFn,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['notification'] });
      },
   });
   return { createNotification, isCreating, error };
};

export const useGetAllNotifications = () => {
   const {
      isLoading,
      data: notifications,
      error,
   } = useQuery({
      queryKey: ['notification'],
      queryFn: () => getAllNotificationsFn,
      staleTime: 5000,
      refetchInterval: 5000,
   });

   return { isLoading, notifications, error };
};

export const useGetOneNotification = (ids: string[]) => {
   const { data: notifications, error } = useQuery({
      queryKey: ['notification', ids],
      queryFn: async () => {
         const notificationsData = await Promise.all(ids.map(id => getOneNotificationFn(id)));
         return notificationsData;
      },
   });

   return { notifications, error };
};
export const useGetNotification = (id: string) => {
   const {
      data: notifications,
      error,
      isLoading,
   } = useQuery({
      queryKey: ['notification', id],
      queryFn: () => getOneNotificationFn(id),
   });

   return { notifications, error, isLoading };
};
