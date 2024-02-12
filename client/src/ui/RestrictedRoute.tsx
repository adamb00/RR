import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RestrictedRoute() {
   const [count, setCount] = useState(5);
   const navigate = useNavigate();

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
            <span className='heading-primary'>Uh-oh! Something went wrong!</span>
            <span className='emoji'>🤯</span>

            <div className='restricted__counter'>
               We are redirecting you to home page in <span className='restricted__counter--count'>{count}</span>
               {count > 1 ? ' seconds' : ' second'}
            </div>
            <div className='restricted__message'>Please log in again</div>
         </div>
      </div>
   );
}
