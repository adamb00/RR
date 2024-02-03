import { PropsWithChildren } from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';

interface UserInputProps {
   placeholder?: string;
   type?: string;
   name: string;
   control: Control;
   rules?: RegisterOptions;
   formError?: boolean;
   className?: string;
   id?: string | undefined;
   fieldErrorClassname?: string;
   eError?: string;
   defaultValue?: string;
   onChange?: () => void;
}

export default function UserInput({
   children,
   control,
   name,
   rules,
   placeholder,
   className,
   fieldErrorClassname,
   type,
   id,
   onChange,
}: PropsWithChildren<UserInputProps>) {
   return (
      <Controller
         control={control}
         name={name}
         rules={rules}
         render={({ field: { value, onChange: onFieldChange, onBlur }, fieldState: { error: fieldError } }) => (
            <div className='user-input'>
               {children}
               <label htmlFor={id}></label>
               <input
                  id={id ? id : 'id'}
                  autoComplete='new-password'
                  autoFocus={false}
                  type={type}
                  className={fieldError ? `${className}--error ${className}` : className}
                  placeholder={placeholder}
                  onChange={e => {
                     if (onChange) {
                        onChange();
                     }
                     onFieldChange(e);
                  }}
                  onBlur={onBlur}
                  lang='en-EN'
                  defaultValue={type === 'date' ? new Date().toISOString().split('T')[0] : value}
                  max={new Date().toISOString().split('T')[0]}
               />
               {fieldError && (
                  <p className={fieldErrorClassname}>
                     {fieldError.message || 'Something went wrong. Please try again.'}
                  </p>
               )}
            </div>
         )}
      />
   );
}
