export const BASE_URL = 'http://192.168.0.33:8000/api/v1/';
// export const BASE_URL = 'http://localhost:8000/api/v1/';

export const OPTIONS = (method: string, data?: FormData | string | object, header: string = 'application/json') => {
   let headers: Record<string, string> = { 'Content-Type': header };
   let body: BodyInit | null | undefined;

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

export function formatDate(dateStr: string) {
   return new Intl.DateTimeFormat('hu', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
   }).format(new Date(dateStr));
}
