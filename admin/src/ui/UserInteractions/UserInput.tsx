import { ComponentPropsWithoutRef } from 'react';
import { Control, Controller } from 'react-hook-form';

interface UserInputProps extends ComponentPropsWithoutRef<'input'> {
   name: string;
   control: Control;
   label: string;
}

export default function UserInput({
   control,
   name,
   type,
   label,
   placeholder,
   className,
   defaultValue,
}: UserInputProps) {
   return (
      <Controller
         control={control}
         name={name}
         defaultValue={defaultValue}
         render={({ field: { value, onChange, onBlur } }) => (
            <div className='user-input'>
               <label htmlFor={name} className='user-input__label'>
                  {label}
               </label>
               <input
                  autoComplete='off'
                  autoFocus={false}
                  defaultValue={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type={type}
                  className={`user-input__input ${className}`}
                  placeholder={placeholder}
               />
            </div>
         )}
      />
   );
}
