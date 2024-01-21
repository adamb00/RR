import { PropsWithChildren } from 'react';

interface ButtonProps {
   onClick?: () => void;
   disabled?: boolean;
   className?: string;
}

export default function Button({ children, onClick, disabled, className }: PropsWithChildren<ButtonProps>) {
   return (
      <button onClick={onClick} disabled={disabled} className={className} aria-label='button'>
         {children}
      </button>
   );
}
