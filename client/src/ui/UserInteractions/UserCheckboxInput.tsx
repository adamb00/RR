import React, { PropsWithChildren } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

interface UserCheckboxInputProps extends React.ComponentPropsWithoutRef<'input'> {
   name: string;
   control: Control;
   rules?: RegisterOptions;
   formError?: boolean;
   fieldErrorClassname?: string;
   eError?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   defaultChecked: boolean;
   outterClassName?: string;
}

export default function UserCheckboxInput({
   control,
   name,
   rules,
   className,
   onChange,
   children,
   defaultChecked,
   outterClassName,
}: PropsWithChildren<UserCheckboxInputProps>) {
   return (
      <Controller
         control={control}
         name={name}
         rules={rules}
         render={({ field: { value, onChange: onFieldChange, onBlur }, fieldState: { error: fieldError } }) => (
            <div className={`user-input--checkbox ${outterClassName}`}>
               {children}
               <input
                  type='checkbox'
                  id={name}
                  autoFocus={false}
                  className={fieldError ? `${className}--error ${className}` : className}
                  onChange={e => {
                     if (onChange) {
                        onChange(e);
                     }
                     onFieldChange(e);
                  }}
                  defaultChecked={defaultChecked || value}
                  onBlur={onBlur}
               />
            </div>
         )}
      />
   );
}
