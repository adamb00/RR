import { OPTIONS, getUserToken } from '../utils/helpers';
import { BASE_URL } from '../utils/constants';

export const getOneUser = async (id: string) => {
   const response = await fetch(BASE_URL + `user/${id}`, OPTIONS({ method: 'GET' }));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};

export const getUserImage = async (key: string) => {
   const userToken = await getUserToken();
   const response = await fetch(
      BASE_URL + `user/get-image/${key}`,
      OPTIONS({ method: 'GET', userToken, header: 'image/png' })
   );

   const imageBlob = await response.blob();

   return URL.createObjectURL(imageBlob);
};

export const activateUser = async (token: string) => {
   const response = await fetch(BASE_URL + `auth/activate-account/${token}`, OPTIONS({ method: 'GET' }));
   const responseData = await response.json();

   return responseData;
};

export const forgotPassword = async (data: object) => {
   const response = await fetch(BASE_URL + `auth/forgot-password`, OPTIONS({ method: 'POST', data }));
   const responseData = await response.json();

   return responseData;
};
