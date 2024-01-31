import { MouseEventHandler, PropsWithChildren } from 'react';

interface ButtonProps {
   onClick: MouseEventHandler;
   disabled?: boolean;
   className?: string;
}

export default function ButtonIcon({ children, onClick, disabled, className }: PropsWithChildren<ButtonProps>) {
   return (
      <button onClick={onClick} disabled={disabled} className={`btn-icon ${className}`} aria-label='button-icon'>
         {children}
      </button>
   );
}
