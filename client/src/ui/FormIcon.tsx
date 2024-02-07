import { PropsWithChildren } from 'react';

interface FormIconProps {
   tooltip: string;
}

export default function FormIcon({ children, tooltip }: PropsWithChildren<FormIconProps>) {
   return (
      <div className='form-icon' data-content={tooltip}>
         {children}
      </div>
   );
}
