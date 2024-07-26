import { useTheme } from '@/context/ThemeContext';
import { darkGrey, lightGrey } from '@/utils/constants';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

interface InformationProps extends ComponentPropsWithoutRef<'div'> {
   cont: ReactNode;
}

export default function Information({ className, cont }: InformationProps) {
   const { theme } = useTheme(),
      isDark = theme === 'dark';
   const contentStyle = {
      backgroundColor: isDark ? darkGrey : lightGrey,
      fontSize: '1.2rem',
      color: isDark ? lightGrey : darkGrey,
      zIndex: 5000,
   };
   const overlayStyle = { background: 'rgba(109, 109, 109,0.5)', zIndex: 5000 };
   const arrowStyle = { color: isDark ? darkGrey : lightGrey, zIndex: 5000 };
   return (
      <div className={`${className}`}>
         <Popup
            trigger={
               <button type='button'>
                  <IoInformationCircleOutline />
               </button>
            }
            {...{ contentStyle, overlayStyle, arrowStyle }}
            position={'bottom left'}
         >
            <div>{cont}</div>
         </Popup>
      </div>
   );
}
