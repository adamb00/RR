// import { BASE_URL } from '../utils/constants';
import { OPTIONS } from '../utils/helpers';

export const createNotification = async (data: object) => {
   const response = await fetch(
      import.meta.env.VITE_BASE_URL + 'notification',
      await OPTIONS({ method: 'POST', data })
   );
   const responseData = await response.json();

   return responseData;
};
