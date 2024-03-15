import { ChangeEvent, PropsWithChildren } from 'react';
import { Control, Controller } from 'react-hook-form';

interface UploadImageProps extends React.ComponentPropsWithoutRef<'input'> {
   control: Control;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   name: string;
   label?: string;
}

//TODO TRANSLATE IF POSSIBLE

export default function UserImageInput({
   control,
   name,
   onChange,
   children,
   id,
   className,
}: PropsWithChildren<UploadImageProps>) {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field: { onBlur, onChange: onFieldChange }, fieldState: { error: fieldError } }) => (
            <div className={`user-input__upload--image ${className}`}>
               {children}
               <input
                  style={{ display: 'none' }}
                  type='file'
                  name={name}
                  id={id}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                     if (onChange) onChange(e);
                     const file = e.target.files && e.target.files[0];
                     if (file) onFieldChange(file);
                  }}
                  onBlur={onBlur}
               />
               {fieldError && (
                  <p className='user-input__errorlabel'>
                     {fieldError.message || 'Something went wrong. Please try again.'}
                  </p>
               )}
            </div>
         )}
      />
   );
}
