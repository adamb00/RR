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

export const formatDate = (dateStr: string, lang: string) => {
   const date = new Date(dateStr);

   if (isNaN(date.getTime())) {
      return 'Nincs elérhető kérés';
   }
   return new Intl.DateTimeFormat(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   }).format(new Date(date));
};

export const handleCopy = (text: string) => {
   if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(err => {
         console.error('Failed to copy text: ', err);
      });
   } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
         document.execCommand('copy');
      } catch (err) {
         console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(textArea);
   }
};
