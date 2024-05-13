export const emptyInputField = (className: string) => {
   const inputElement = document.querySelector(className) as HTMLInputElement;
   if (inputElement) {
      inputElement.value = '';
   }
};

export const truncateText = (text: string, maxLength: number) => {
   if (text && text.length > maxLength) {
      const commaIndex = text.lastIndexOf(',', maxLength - 3);
      if (commaIndex !== -1) {
         return text.substring(0, commaIndex) + '...';
      }
      return text.substring(0, maxLength - 3) + '...';
   }
   return text;
};

export const OPTIONS = async (options: {
   method: string;
   data?: FormData | string | object | FileReader;
   userToken?: string;
   header?: string;
}) => {
   const { method, data, header = 'application/json' } = options;

   const headers: Record<string, string> = { 'Content-Type': 'application/json' };

   let body: BodyInit | null | undefined;

   const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root') as string).auth).token;

   headers['Authorization'] = `Bearer ${token}`;

   if (header === 'multipart/form-data') {
      headers['Content-Type'] = 'multipart/form-data';
      body = data as FormData;
   } else if (header === 'application/json' && typeof data === 'object') {
      body = JSON.stringify(data);
   } else {
      body = data as string;
   }

   return {
      method,
      withCredentials: true,
      headers,
      body,
   };
};
