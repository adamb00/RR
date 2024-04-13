import { OPTIONS } from '../utils/helpers';

export const getOneUser = async (id: string) => {
   const response = await fetch(import.meta.env.VITE_BASE_URL + `/user/${id}`, await OPTIONS({ method: 'GET' }));
   console.log(response);
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};
export const getOneUserByUsername = async (username: string) => {
   const response = await fetch(import.meta.env.VITE_BASE_URL + `/user/${username}`, await OPTIONS({ method: 'GET' }));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};

export const activateUser = async (token: string) => {
   const response = await fetch(
      import.meta.env.VITE_BASE_URL + `/auth/activate-account/${token}`,
      await OPTIONS({ method: 'GET' })
   );
   const responseData = await response.json();

   return responseData;
};

export const forgotPassword = async (data: object) => {
   const response = await fetch(
      import.meta.env.VITE_BASE_URL + `/auth/forgot-password`,
      await OPTIONS({ method: 'POST', data })
   );
   const responseData = await response.json();

   return responseData;
};
