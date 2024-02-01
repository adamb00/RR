import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   createUser as createUserFn,
   getReferralCode as getReferralCodeFn,
   loginUser as loginUserFn,
   logoutUser as logoutUserFn,
   getOneUser as getOneUserFn,
   updateOneUser as updateOneUserFn,
   getCurrentUser as getCurrentUserFn,
   sendNotification as sendNotificationFn,
   updateAllNotificiations as updateAllNotificiationsFn,
   updateOneNotification as updateOneNotificationFn,
} from '../../services/apiUser';
import IError from '../../interfaces/IError';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Props {
   onError: CallableFunction;
}

interface MutationParams {
   id: string;
   data: object;
}

export const useCreateUser = ({ onError }: Props) => {
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const {
      mutate: createUser,
      isLoading: isCreating,
      error,
   } = useMutation({
      mutationFn: createUserFn,
      onError: (error: IError) => {
         onError(error);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['user'] });
         //TODO ONLY REDIRECT IF NO ERROR
         navigate('/');
      },
   });
   return { createUser, isCreating, error };
};

export const useGetReferalCode = () => {
   const queryClient = useQueryClient();
   const {
      isLoading,
      mutate: getReferralCode,
      error,
   } = useMutation({
      mutationFn: getReferralCodeFn,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['user'] });
      },
   });

   return { isLoading, getReferralCode, error };
};

export const useLoginUser = ({ onError }: Props) => {
   const queryClient = useQueryClient();
   const navigate = useNavigate();
   const { signin } = useAuth();

   const {
      mutate: loginUser,
      isLoading: isLogging,
      error: loginError,
   } = useMutation({
      mutationFn: loginUserFn,
      onError: (error: IError) => {
         onError(error);
      },
      onSuccess: data => {
         queryClient.invalidateQueries({ queryKey: ['user'] });
         signin(data);
         navigate('/');
      },
   });

   return { loginUser, isLogging, loginError };
};

export const useGetCurrentUser = () => {
   const {
      isLoading,
      data: currentUser,
      error,
   } = useQuery({
      queryKey: ['user'],
      queryFn: getCurrentUserFn,
   });

   return { isLoading, currentUser, error };
};

export const useLogoutUser = () => {
   const { signout } = useAuth();
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const { mutate: logoutUser } = useMutation({
      mutationFn: logoutUserFn,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['user'] });
         signout();
         navigate('/');
      },
   });

   return { logoutUser };
};

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
   const { mutate: updateNotifications, isLoading: isUpdating } = useMutation({
      mutationFn: updateAllNotificiationsFn,
   });

   return { updateNotifications, isUpdating };
};

export const useMarkNotification = () => {
   const { mutate: updateOneNotification, isLoading: isUpdatingNotification } = useMutation({
      mutationFn: (id: string) => updateOneNotificationFn(id),
   });

   return { updateOneNotification, isUpdatingNotification };
};
