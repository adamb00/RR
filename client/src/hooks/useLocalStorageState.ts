import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type UseLocalStorageStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

export function useLocalStorageState<T>(initialState: T, key: string): UseLocalStorageStateReturnType<T> {
   const [value, setValue] = useState<T>(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
   });

   useEffect(
      function () {
         localStorage.setItem(key, JSON.stringify(value));
      },
      [value, key]
   );

   return [value, setValue];
}
