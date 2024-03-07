import { PropsWithChildren } from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';

interface UserInputProps extends React.ComponentPropsWithoutRef<'input'> {
   name: string;
   control: Control;
   rules?: RegisterOptions;
   formError?: boolean;
   fieldErrorClassname?: string;
   eError?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

//TODO TRANSLATE IF POSSIBLE
export default function UserInput({
   children,
   control,
   name,
   rules,
   className,
   placeholder,
   fieldErrorClassname,
   defaultValue,
   type,
   onChange,
   eError,
}: PropsWithChildren<UserInputProps>) {
   return (
      <Controller
         control={control}
         name={name}
         defaultValue={defaultValue}
         rules={rules}
         render={({ field: { value, onChange: onFieldChange, onBlur }, fieldState: { error: fieldError } }) => (
            <div className='user-input'>
               {children}
               <input
                  autoComplete='new-password'
                  id={name}
                  autoFocus={false}
                  type={type}
                  className={fieldError ? `${className}--error ${className}` : className}
                  onChange={e => {
                     if (onChange) {
                        onChange(e);
                     }
                     onFieldChange(e);
                  }}
                  placeholder={placeholder}
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
               {eError && <p className={fieldErrorClassname}>{eError}</p>}
            </div>
         )}
      />
   );
}
