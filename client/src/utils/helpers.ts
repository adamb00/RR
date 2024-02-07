import INotification from '../interfaces/INotification';
import IError from '../interfaces/IError';

export const BASE_URL_SOCKET = 'http://192.168.0.33:8000';
// export const BASE_URL_SOCKET = 'http://172.20.10.3:8000/'; // MOBILNET

export const BASE_URL = 'http://192.168.0.33:8000/api/v1/';
// export const BASE_URL = 'http://172.20.10.3:8000/api/v1/'; // MOBILNET
// export const BASE_URL = 'http://localhost:8000/api/v1/';

export const getUserToken = async () => {
   return sessionStorage.getItem('user') as string;
};

export const OPTIONS = (options: {
   method: string;
   data?: FormData | string | object;
   userToken?: string;
   header?: string;
}) => {
   const { method, data, userToken, header = 'application/json' } = options;

   let headers: Record<string, string> = { 'Content-Type': 'application/json' };

   let body: BodyInit | null | undefined;

   if (userToken) {
      headers['Authorization'] = `Bearer ${userToken}`;
   }

   if (header === 'multipart/form-data') {
      headers = {};
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

export const IS_VALID_EMAIL = (v: string) =>
   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email address must be a valid address';

export const IS_VALID_NUMBER = (v: string) => {
   if (v === '') {
      return true;
   }
   return /^[0-9]+$/.test(v) || 'Value must be a valid number';
};

export const formatDate = (dateStr: string) => {
   const date = new Date(dateStr);

   if (isNaN(date.getTime())) {
      return 'Invalid Date';
   }
   return new Intl.DateTimeFormat('hu', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   }).format(new Date(date));
};

export const createMonogram = (fullName: string) => {
   return fullName
      .split(' ')
      .map(name => name[0].toUpperCase())
      .join('');
};

export const closeMenu = () => {
   const checkbox = document.getElementById('navi-toggle') as HTMLInputElement;
   if (checkbox) {
      checkbox.checked = !checkbox.checked;
   }
};

export const truncateText = (text: string, maxLength: number) => {
   if (text.length > maxLength) {
      const commaIndex = text.lastIndexOf(',', maxLength - 3);
      if (commaIndex !== -1) {
         return text.substring(0, commaIndex) + '...';
      }
      return text.substring(0, maxLength - 3) + '...';
   }
   return text;
};

export const stripHtmlTags = (htmlString: string): string => {
   const doc = new DOMParser().parseFromString(htmlString, 'text/html');
   return doc.body.textContent || '';
};

export const emptyInputField = (className: string) => {
   const inputElement = document.querySelector(className) as HTMLInputElement;
   if (inputElement) {
      inputElement.value = '';
   }
};

export const getSortedNotifications = async (notifications: INotification[]) => {
   if (!Array.isArray(notifications)) {
      notifications = Array.from(notifications);
   }

   return notifications.slice().sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
   });
};

export const sortNotifications = (notifications: INotification[]) => {
   return notifications.slice().sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
   });
};

export const getErrorMessage = (error: unknown): string | IError => {
   let message: string;
   let item: string;

   if (error instanceof Error) message = error.message;
   else if (error && typeof error === 'object' && 'message' in error) {
      message = String(error.message);
   } else if (typeof error === 'string') {
      message = error;
   } else if (error && typeof error === 'object' && 'data' in error) {
      message = String((error.data as IError).message);
      item = String((error.data as IError).item);
      return { message, item } as IError;
   } else {
      message = 'Something went very wrong!';
   }

   return message;
};
export const handleError = (error: IError | string | null, item: string): string => {
   if (!error) return '';
   if (typeof error === 'string') return error;

   return (error as IError).item === item ? (error as IError).message : '';
};
