import ICustomError from '../interfaces/ICustomError';

export const getErrorMessage = (error: unknown): string | ICustomError => {
   let message: string;

   if (error instanceof Error) message = error.message;
   else if (error && typeof error === 'object' && 'message' in error) {
      message = String(error.message);
   } else if (typeof error === 'string') {
      message = error;
   } else if (error && typeof error === 'object' && 'data' in error) {
      message = String((error.data as ICustomError).message);
      return { message } as ICustomError;
   } else {
      message = 'Something went very wrong!';
   }

   return message;
};
export const handleError = (error: ICustomError | string | null, item: string) => {
   if (!error) return '';
   if (typeof error === 'string') return error;
};

export const generateString = (length: number) => {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   const charactersLength = characters.length;
   let result = ' ';
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result;
};
