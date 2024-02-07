import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   getOneUser as getOneUserFn,
   getUserImage as getUserImageFn,
   activateUser as activateUserFn,
} from '../../services/apiUser';

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

export const useGetUserImage = (key: string) => {
   const {
      isLoading,
      data: image,
      error,
   } = useQuery({
      queryKey: ['user', key],
      queryFn: () => getUserImageFn(key),
      staleTime: 1000,
      refetchInterval: 1000,
   });

   if (!key) {
      return { isLoading: false, image: null, error: null };
   }
   return { isLoading, image, error };
};

export const useActivateUser = () => {
   const queryClient = useQueryClient();
   const {
      mutate: activateUser,
      isLoading: isActivating,
      error,
   } = useMutation({
      mutationFn: activateUserFn,
      onSuccess: () => {
         queryClient.invalidateQueries(['user']);
      },
   });
   return { activateUser, isActivating, error };
};
