import { BASE_URL, OPTIONS } from '../utils/helpers';

export const getOneUser = async (id: string) => {
   const response = await fetch(BASE_URL + `user/${id}`, OPTIONS({ method: 'GET' }));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};
