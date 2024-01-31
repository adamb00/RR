import { useState, useEffect } from 'react';

const useDeviceDetection = () => {
   const [device, setDevice] = useState('');

   useEffect(() => {
      const handleDeviceDetection = () => {
         const userAgent = navigator.userAgent.toLowerCase();
         const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
         const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);
         const screenWidth = window.innerWidth;

         if (isMobile) {
            setDevice('Mobile');
         } else if (isTablet || (screenWidth >= 600 && screenWidth <= 1024)) {
            setDevice('Tablet');
         } else {
            setDevice('Desktop');
         }
      };

      handleDeviceDetection();
      window.addEventListener('resize', handleDeviceDetection);

      return () => {
         window.removeEventListener('resize', handleDeviceDetection);
      };
   }, []);

   return device;
};

export default useDeviceDetection;
