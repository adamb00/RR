import { memo } from 'react';
import LogoImage from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default memo(function Logo() {
   const navigate = useNavigate();
   return (
      <div className='header-icon'>
         <img src={LogoImage} className='header-icon__image' onClick={() => navigate('/')} alt='Logo' />
      </div>
   );
});
