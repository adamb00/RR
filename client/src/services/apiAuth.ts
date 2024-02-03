import { BASE_URL, OPTIONS } from '../utils/helpers';

// export const createUser = async (data: object) => {
//    const response = await fetch(BASE_URL + 'auth/signup', OPTIONS({ method: 'POST', data }));
//    const responseData = await response.json();

//    return responseData;
// };

export const getReferralCode = async (referralCode: number) => {
   const response = await fetch(BASE_URL + `auth/getReferralCode/${referralCode}`, OPTIONS({ method: 'GET' }));
   const responseData = await response.json();

   return responseData;
};

// export const loginUser = async (data: object) => {
//    try {
//       const response = await fetch(BASE_URL + 'auth/signin', OPTIONS({ method: 'POST', data }));
//       const responseData = await response.json();

//       return responseData;
//    } catch (err) {
//       console.log(err);
//    }
// };

// export const logoutUser = async () => {
//    const response = await fetch(BASE_URL + 'auth/signout', OPTIONS({ method: 'POST' }));
//    const responseData = await response.json();

//    if (!response.ok) throw new Error(responseData.message);

//    return responseData;
// };
