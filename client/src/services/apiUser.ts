import { BASE_URL, OPTIONS } from '../utils/helpers';

export const createUser = async (newUser: object) => {
   const response = await fetch(BASE_URL + 'user/signup', OPTIONS('POST', newUser));
   const responseData = await response.json();

   return responseData;
};

export const getReferralCode = async (referralCode: number) => {
   const response = await fetch(BASE_URL + `user/getReferralCode/${referralCode}`, OPTIONS('GET'));
   const responseData = await response.json();

   return responseData;
};

export const loginUser = async (user: object) => {
   const response = await fetch(BASE_URL + 'user/signin', OPTIONS('POST', user));
   const responseData = await response.json();

   return responseData;
};
