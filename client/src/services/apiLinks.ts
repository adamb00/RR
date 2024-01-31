import { ITEM_PER_PAGE } from '../utils/constants';
import { BASE_URL, OPTIONS, getUserToken } from '../utils/helpers';

export const createLink = async (link: string) => {
   const userToken = await getUserToken();
   const response = await fetch(BASE_URL + 'link', OPTIONS({ method: 'POST', data: { link }, userToken }));
   const responseData = await response.json();

   return responseData;
};

interface GetAllLinksParams {
   page: number;
}

export const getAllLinks = async ({ page }: GetAllLinksParams) => {
   const userToken = await getUserToken();
   const response = await fetch(
      BASE_URL + `link?page=${page}&limit=${ITEM_PER_PAGE}`,
      OPTIONS({ method: 'GET', userToken })
   );
   const responseData = await response.json();

   return responseData;
};

export const deleteOneLink = async (id: string) => {
   const userToken = await getUserToken();
   const response = await fetch(BASE_URL + `link/${id}`, OPTIONS({ method: 'DELETE', userToken }));

   if (response.ok) {
      return;
   } else {
      throw new Error('Link could not be deleted');
   }
};

export const updateOneLink = async ({ id, data }: { id: string; data: object }) => {
   const userToken = await getUserToken();
   const response = await fetch(BASE_URL + `link/${id}`, OPTIONS({ method: 'PATCH', data, userToken }));
   if (!response.ok) {
      throw new Error(`Failed to update user. Status: ${response.status}`);
   }

   const responseData = await response.json();

   console.log(responseData);
   return responseData;
};
