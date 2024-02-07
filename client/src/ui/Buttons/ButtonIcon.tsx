import { PropsWithChildren } from 'react';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export default function ButtonIcon({ children, onClick, disabled, className }: PropsWithChildren<ButtonProps>) {
   return (
      <button onClick={onClick} disabled={disabled} className={`btn-icon ${className}`} aria-label='button-icon'>
         {children}
      </button>
   );
}
