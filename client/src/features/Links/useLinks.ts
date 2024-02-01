import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
   createLink as createLinkFn,
   getAllLinks as getAllLinksFn,
   deleteOneLink as deleteOneLinkFn,
   updateOneLink as updateOneLinkFn,
} from '../../services/apiLinks';
import IError from '../../interfaces/IError';
import { useSearchParams } from 'react-router-dom';
import { ITEM_PER_PAGE } from '../../utils/constants';

interface Props {
   onError: CallableFunction;
}

interface MutationParams {
   id: string;
   data: object;
}

export const useCreateLink = ({ onError }: Props) => {
   const queryClient = useQueryClient();

   const {
      mutate: createLink,
      error,
      isLoading: isCreating,
   } = useMutation(async (link: string) => createLinkFn(link), {
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['link'] });
      },
      onError: (error: IError) => {
         onError(error);
      },
   });
   return { createLink, error, isCreating };
};

export const useGetAllLinks = () => {
   const queryClient = useQueryClient();
   const [searchParams] = useSearchParams();

   const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

   const {
      isLoading,
      data: links,
      error,
   } = useQuery({
      queryKey: ['link', page],
      queryFn: () => getAllLinksFn({ page }),
      staleTime: 5000,
      refetchInterval: 5000,
   });

   const count = links?.totalItems;
   const pageCount = Math.ceil(count / ITEM_PER_PAGE);

   if (page < pageCount)
      queryClient.prefetchQuery({
         queryKey: ['link', page + 1],
         queryFn: () => getAllLinksFn({ page: page + 1 }),
         staleTime: 5000,
      });

   if (page > 1)
      queryClient.prefetchQuery({
         queryKey: ['link', page - 1],
         queryFn: () => getAllLinksFn({ page: page - 1 }),
         staleTime: 5000,
      });

   return { isLoading, error, links, count };
};

export const useDeleteOneLink = () => {
   const queryClient = useQueryClient();

   const { isLoading: isDeleting, mutate: deleteLink } = useMutation({
      mutationFn: deleteOneLinkFn,
      onSuccess: async () => {
         queryClient.invalidateQueries({ queryKey: ['link'] });
         queryClient.invalidateQueries({ queryKey: ['user'] });
      },
   });

   return { isDeleting, deleteLink };
};

export const useUpdateLink = () => {
   const queryClient = useQueryClient();

   const { mutate: updateLink, isLoading: isUpdating } = useMutation({
      mutationFn: (mutateParams: MutationParams) => updateOneLinkFn(mutateParams),
      onSuccess: link => {
         queryClient.setQueryData(['link'], link);
      },
   });

   return { updateLink, isUpdating };
};
