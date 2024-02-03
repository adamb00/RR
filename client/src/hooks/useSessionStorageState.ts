import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type UseSessionStorageStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

export function useSessionStorageState<T>(initialState: T, key: string): UseSessionStorageStateReturnType<T> {
   const [value, setValue] = useState<T>(() => {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
   });

   useEffect(() => {
      if (value === undefined || value === null) {
         sessionStorage.removeItem(key);
      } else {
         sessionStorage.setItem(key, JSON.stringify(value));
      }
   }, [value, key]);

   return [value, setValue];
}
