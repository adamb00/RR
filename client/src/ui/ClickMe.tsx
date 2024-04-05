import { memo } from 'react';
import Clickme from '/clickme.png';

export default memo(function ClickMe() {
   return <img src={Clickme} className='links__click-me' loading='lazy' alt='Click me' />;
});
