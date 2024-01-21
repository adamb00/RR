import ButtonIcon from './ButtonIcon';
import { CiBellOn } from 'react-icons/ci';

export default function Notifications() {
   const handleOnClick = () => {
      console.log('lol');
   };
   return (
      <ButtonIcon onClick={handleOnClick}>
         <CiBellOn />
      </ButtonIcon>
   );
}
