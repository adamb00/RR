import { PropsWithChildren } from 'react';

interface IconProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function Icon({ children, className, onClick }: PropsWithChildren<IconProps>) {
   return (
      <div onClick={onClick} className={`icon ${className}`}>
         {children}
      </div>
   );
}
