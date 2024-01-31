import { useTheme } from '../context/ThemeContext';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import ButtonIcon from './Buttons/ButtonIcon';

export default function ThemeSwitcher() {
   const { theme, handleToggle } = useTheme();

   return (
      <ButtonIcon onClick={() => handleToggle(theme)}>
         {theme === 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
      </ButtonIcon>
   );
}
