import { BASE_URL, OPTIONS, getUserToken } from '../utils/helpers';

export const createNotification = async (data: object) => {
   const userToken = await getUserToken();
   const response = await fetch(BASE_URL + 'notification', OPTIONS({ method: 'POST', data, userToken }));
   const responseData = await response.json();

   console.log(responseData);

   return responseData;
};

export const getAllNotifications = async () => {
   const userToken = await getUserToken();
   const response = await fetch(BASE_URL + 'notification', OPTIONS({ method: 'GET', userToken }));
   const responseData = await response.json();

   return responseData;
};

export const getOneNotification = async (id: string) => {
   const userToken = await getUserToken();
   const response = await fetch(BASE_URL + `notification/${id}`, OPTIONS({ method: 'GET', userToken }));
   const responseData = await response.json();

   return responseData.doc;
};
