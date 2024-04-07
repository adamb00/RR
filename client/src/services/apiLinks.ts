import { ITEM_PER_PAGE } from '../utils/constants';
import { OPTIONS } from '../utils/helpers';

export const createLink = async (link: string) => {
   const response = await fetch(
      import.meta.env.VITE_BASE_URL + '/link',
      await OPTIONS({ method: 'POST', data: { link } })
   );

   console.log(response);
   const responseData = await response.json();

   return responseData;
};

interface GetAllLinksParams {
   page: number;
}

export const getAllLinks = async ({ page }: GetAllLinksParams) => {
   const response = await fetch(
      import.meta.env.VITE_BASE_URL + `/link?page=${page}&limit=${ITEM_PER_PAGE}`,
      await OPTIONS({ method: 'GET' })
   );
   const responseData = await response.json();

   return responseData;
};
export const deleteOneLink = async (id: string) => {
   const response = await fetch(import.meta.env.VITE_BASE_URL + `/link/${id}`, await OPTIONS({ method: 'DELETE' }));

   if (response.ok) {
      return;
   } else {
      throw new Error('Link could not be deleted');
   }
};

export const updateOneLink = async ({ id, data }: { id: string; data: object }) => {
   const response = await fetch(
      import.meta.env.VITE_BASE_URL + `/link/${id}`,
      await OPTIONS({ method: 'PATCH', data })
   );
   if (!response.ok) {
      throw new Error(`Failed to update link. Status: ${response.status}`);
   }

   const responseData = await response.json();

   return responseData;
};

export const getLinkImage = async (key: string) => {
   const response = await fetch(
      import.meta.env.VITE_BASE_URL + `/link/get-image/${key}`,
      await OPTIONS({ method: 'GET', header: 'image/png' })
   );

   const imageBlob = await response.blob();
   const imageURL = URL.createObjectURL(imageBlob);

   return imageURL;
};
