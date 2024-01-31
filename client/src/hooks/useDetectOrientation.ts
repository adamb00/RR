import { useState, useEffect } from 'react';

const useDetectOrientation = () => {
   const [orientation, setOrientation] = useState<string>(
      window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
   );

   const updateOrientation = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
   };

   useEffect(() => {
      window.addEventListener('resize', updateOrientation);
      return () => {
         window.removeEventListener('resize', updateOrientation);
      };
   }, []);

   return orientation;
};

export default useDetectOrientation;
