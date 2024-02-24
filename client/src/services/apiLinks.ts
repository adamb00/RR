import { ITEM_PER_PAGE } from '../utils/constants';
import { OPTIONS } from '../utils/helpers';

export const createLink = async (link: string) => {
   const response = await fetch(import.meta.env.VITE_BASE_URL + 'link', OPTIONS({ method: 'POST', data: { link } }));
   const responseData = await response.json();

   return responseData;
};

interface GetAllLinksParams {
   page: number;
}

export const getAllLinks = async ({ page }: GetAllLinksParams) => {
   const response = await fetch(
      import.meta.env.VITE_BASE_URL + `link?page=${page}&limit=${ITEM_PER_PAGE}`,
      OPTIONS({ method: 'GET' })
   );
   const responseData = await response.json();

   return responseData;
};
export const deleteOneLink = async (id: string) => {
   const response = await fetch(import.meta.env.VITE_BASE_URL + `link/${id}`, OPTIONS({ method: 'DELETE' }));

   if (response.ok) {
      return;
   } else {
      throw new Error('Link could not be deleted');
   }
};

export const updateOneLink = async ({ id, data }: { id: string; data: object }) => {
   const response = await fetch(import.meta.env.VITE_BASE_URL + `link/${id}`, OPTIONS({ method: 'PATCH', data }));
   if (!response.ok) {
      throw new Error(`Failed to update user. Status: ${response.status}`);
   }

   const responseData = await response.json();

   return responseData;
};
