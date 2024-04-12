import React, { PropsWithChildren } from 'react';
import { Control, Controller } from 'react-hook-form';

interface UserCheckboxInputProps extends React.ComponentPropsWithoutRef<'input'> {
   name: string;
   control: Control;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   defaultChecked: boolean;
   outterClassName?: string;
}

export default function UserCheckboxInput({
   control,
   name,
   className,
   onChange,
   children,
   defaultChecked,
}: PropsWithChildren<UserCheckboxInputProps>) {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field: { value, onChange: onFieldChange, onBlur } }) => (
            <div className={`user-input--checkbox`}>
               {children}
               <input
                  type='checkbox'
                  id={name}
                  autoFocus={false}
                  className={className}
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
