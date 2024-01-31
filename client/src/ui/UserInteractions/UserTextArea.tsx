import { PropsWithChildren } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

interface UserInputProps {
   placeholder?: string;
   name: string;
   control: Control;
   rules?: RegisterOptions;
   formError?: boolean;
   className?: string;
   fieldErrorClassname?: string;
   eError?: string;
   defaultValue?: string;
   onChange?: () => void;
}

export default function UserTextArea({
   children,
   control,
   name,
   rules,
   placeholder,
   className,
   fieldErrorClassname,
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
               <label htmlFor='input'></label>
               <textarea
                  id='text-area'
                  autoComplete='new-password'
                  autoFocus={false}
                  className={fieldError ? `${className}--error ${className}` : className}
                  placeholder={placeholder}
                  aria-multiline={true}
                  onChange={e => {
                     if (onChange) {
                        onChange();
                     }
                     onFieldChange(e);
                  }}
                  onBlur={onBlur}
                  lang='en-EN'
                  defaultValue={value}
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
