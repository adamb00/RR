import { PropsWithChildren, memo } from 'react';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export default memo(function Button({ children, onClick, disabled, className }: PropsWithChildren<ButtonProps>) {
   return (
      <button onClick={onClick} disabled={disabled} className={className} aria-label='button'>
         {children}
      </button>
   );
});
