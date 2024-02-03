import { BASE_URL, OPTIONS, getUserToken } from '../utils/helpers';

export const createNotification = async (data: object) => {
   const userToken = await getUserToken();
   const response = await fetch(BASE_URL + 'notification', OPTIONS({ method: 'POST', data, userToken }));
   const responseData = await response.json();

   return responseData;
};
