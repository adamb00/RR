import { PropsWithChildren } from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import { useState } from 'react'; // Import useState hook

interface UserInputProps extends React.ComponentPropsWithoutRef<'input'> {
   name: string;
   control: Control;
   rules?: RegisterOptions;
   outterClassName?: string;
   formError?: boolean;
   fieldErrorClassname?: string;
   eError?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onBlur?: () => void;
}

export default function UserInput({
   children,
   control,
   name,
   rules,
   className,
   placeholder,
   fieldErrorClassname,
   outterClassName,
   defaultValue,
   type,
   onChange,
   eError,
   onBlur,
}: PropsWithChildren<UserInputProps>) {
   const [isValueChanged, setIsValueChanged] = useState(false); // State to track value change

   return (
      <Controller
         control={control}
         name={name}
         defaultValue={defaultValue}
         rules={rules}
         render={({
            field: { value, onChange: onFieldChange, onBlur: onFieldBlur },
            fieldState: { error: fieldError },
         }) => (
            <div className={outterClassName ? outterClassName : 'user-input'}>
               {children}
               <input
                  autoComplete='off'
                  id={name}
                  autoFocus={false}
                  type={type}
                  className={fieldError ? `${className}--error ${className}` : className}
                  onChange={e => {
                     if (onChange) {
                        onChange(e);
                     }
                     onFieldChange(e);
                     // Check if value changed
                     if (e.target.value !== defaultValue) {
                        setIsValueChanged(true);
                     }
                  }}
                  placeholder={placeholder}
                  onBlur={() => {
                     if (onBlur && isValueChanged) {
                        // Trigger onBlur only if value changed
                        onBlur();
                     }
                     onFieldBlur();
                     setIsValueChanged(false); // Reset flag after onBlur
                  }}
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
