import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function RestrictedRoute() {
   const [count, setCount] = useState(5);
   const navigate = useNavigate();
   const { t } = useTranslation();
   const [first, second] = t('We are redirecting you to home page in').split('$$');

   useEffect(() => {
      const timer = setInterval(() => {
         setCount(prevCount => {
            if (prevCount === 0) {
               clearInterval(timer);
               return 0;
            }
            return prevCount - 1;
         });
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   useEffect(() => {
      if (count === 0) {
         navigate('/');
      }
   }, [count, navigate]);

   return (
      <div className='restricted'>
         <div className='restricted__container'>
            <div className='restricted__header'>
               <span className='heading-primary'>{t('Uh-oh! Something went wrong!')}</span>
               <span className='emoji'>🤯</span>
            </div>

            <div className='restricted__counter'>
               {first} <span className='restricted__counter--count'>{count}</span>
               {second}
            </div>
            <div className='restricted__message'>{t('Please log in again')}</div>
         </div>
      </div>
   );
}
