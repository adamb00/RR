export const BASE_URL = 'http://192.168.0.33:8000/api/v1/';
// export const BASE_URL = 'http://localhost:8000/api/v1/';

export const getUserToken = () => {
   return document.cookie.includes('jwt') ? document.cookie.split('=')[1] : '';
};

export const OPTIONS = (options: {
   method: string;
   data?: FormData | string | object;
   userToken?: string;
   header?: string;
}) => {
   const { method, data, userToken, header = 'application/json' } = options;

   // let headers: Record<string, string> = { 'Content-Type': header ? header : 'application/json' };
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
   return new Intl.DateTimeFormat('hu', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   }).format(new Date(dateStr));
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
