import React, { Dispatch, SetStateAction } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

interface PasswordVisibleProps extends React.ComponentPropsWithoutRef<'div'> {
   isVisible: boolean;
   setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export default function PasswordVisible({ isVisible, setIsVisible, className }: PasswordVisibleProps) {
   return (
      <>
         {isVisible ? (
            <IoEyeOffOutline
               className={`${className} ${className}__eye`}
               onClick={() => setIsVisible(visible => !visible)}
            />
         ) : (
            <IoEyeOutline
               className={`${className} ${className}__eye`}
               onClick={() => setIsVisible(visible => !visible)}
            />
         )}
      </>
   );
}
