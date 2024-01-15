import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
   createUser as createUserFn,
   getReferralCode as getReferralCodeFn,
   loginUser as loginUserFn,
} from '../../services/apiUser';
import IError from '../../interfaces/IError';
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

   const {
      mutate: loginUser,
      isLoading: isLogging,
      error: loginError,
   } = useMutation({
      mutationFn: loginUserFn,
      onError: (error: IError) => {
         onError(error);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['user'] });
      },
   });

   return { loginUser, isLogging, loginError };
};
