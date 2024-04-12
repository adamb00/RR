import { PropsWithChildren, memo } from 'react';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export default memo(function Button({ children, disabled, onClick }: PropsWithChildren<ButtonProps>) {
   return (
      <button disabled={disabled} aria-label='button' onClick={onClick} className='btn'>
         {children}
      </button>
   );
});
