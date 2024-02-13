import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   getOneUser as getOneUserFn,
   getUserImage as getUserImageFn,
   activateUser as activateUserFn,
   forgotPassword as forgotPasswordFn,
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
      refetch,
   } = useQuery({
      queryKey: ['user', key],
      queryFn: () => getUserImageFn(key),
   });

   if (!key) {
      return { isLoading: false, image: null, error: null };
   }
   return { isLoading, image, error, refetch };
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

export const useForgotPassword = () => {
   const { mutate: forgotPassword, isLoading } = useMutation({
      mutationFn: forgotPasswordFn,
   });

   return { forgotPassword, isLoading };
};
