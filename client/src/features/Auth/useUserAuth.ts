import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   createUser as createUserFn,
   getReferralCode as getReferralCodeFn,
   loginUser as loginUserFn,
   logoutUser as logoutUserFn,
   getOneUser as getOneUserFn,
} from '../../services/apiUser';
import IError from '../../interfaces/IError';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Props {
   onError: CallableFunction;
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
      staleTime: 5000,
      refetchInterval: 5000,
   });

   return { isLoading, currentUser, error };
};
