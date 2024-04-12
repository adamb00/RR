import { memo } from 'react';
import LogoImage from '/logo3.png';
import { useNavigate } from 'react-router-dom';

export default memo(function Logo() {
   const navigate = useNavigate();
   return (
      <div className='header-icon'>
         <img src={LogoImage} className='header-icon__image' loading='lazy' onClick={() => navigate('/')} alt='Logo' />
      </div>
   );
});
