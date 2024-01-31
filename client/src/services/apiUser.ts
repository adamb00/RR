import { BASE_URL, OPTIONS, getUserToken } from '../utils/helpers';

export const createUser = async (data: object) => {
   const response = await fetch(BASE_URL + 'user/signup', OPTIONS({ method: 'POST', data }));
   const responseData = await response.json();

   return responseData;
};

export const getReferralCode = async (referralCode: number) => {
   const response = await fetch(BASE_URL + `user/getReferralCode/${referralCode}`, OPTIONS({ method: 'GET' }));
   const responseData = await response.json();

   return responseData;
};

export const loginUser = async (data: object) => {
   try {
      const response = await fetch(BASE_URL + 'user/signin', OPTIONS({ method: 'POST', data }));
      const responseData = await response.json();

      return responseData;
   } catch (err) {
      console.log(err);
   }
};

export const getCurrentUser = async () => {
   const userToken = await getUserToken();
   const response = await fetch(BASE_URL + 'user/current-user', OPTIONS({ method: 'GET', userToken }));
   const responseData = await response.json();

   return responseData;
};

export const logoutUser = async () => {
   const response = await fetch(BASE_URL + 'user/signout', OPTIONS({ method: 'POST' }));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};

export const getOneUser = async (id: string) => {
   const response = await fetch(BASE_URL + `user/${id}`, OPTIONS({ method: 'GET' }));
   const responseData = await response.json();

   if (!response.ok) throw new Error(responseData.message);

   return responseData;
};

export const updateOneUser = async ({ id, data }: { id: string; data: object }) => {
   try {
      const response = await fetch(BASE_URL + `user/${id}`, OPTIONS({ method: 'PATCH', data }));

      if (!response.ok) {
         throw new Error(`Failed to update user. Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error updating user:', error);
      throw error;
   }
};

export const sendNotification = async (data: object) => {
   const userToken = await getUserToken();
   const response = await fetch(BASE_URL + `user/send-notification`, OPTIONS({ method: 'PATCH', data, userToken }));
   const resposeData = await response.json();

   return resposeData;
};

export const updateAllNotificiations = async () => {
   const userToken = await getUserToken();
   const response = await fetch(BASE_URL + `user/mark-notifications`, OPTIONS({ method: 'PATCH', userToken }));
   const resposeData = await response.json();

   return resposeData;
};

export const updateOneNotification = async (id: string) => {
   const userToken = await getUserToken();
   console.log(userToken);
   const response = await fetch(
      BASE_URL + `user/mark-one-notification`,
      OPTIONS({ method: 'PATCH', userToken, data: { data: id } })
   );

   const resposeData = await response.json();

   return resposeData;
};
