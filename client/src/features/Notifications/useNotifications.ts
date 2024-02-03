import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNotification as createNotificationFn } from '../../services/apiNotifications';

export const useCreateNotification = () => {
   const queryClient = useQueryClient();
   const {
      mutate: createNotification,
      isLoading: isCreating,
      error,
   } = useMutation({
      mutationFn: createNotificationFn,
      onSuccess: () => {
         queryClient.invalidateQueries(['notification']);
      },
   });
   return { createNotification, isCreating, error };
};
