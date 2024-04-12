import { ChangeEvent, PropsWithChildren } from 'react';
import { Control, Controller } from 'react-hook-form';

interface UploadImageProps extends React.ComponentPropsWithoutRef<'input'> {
   control: Control;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   name: string;
   label?: string;
}

export default function UserImageInput({
   control,
   name,
   onChange,
   children,
   className,
}: PropsWithChildren<UploadImageProps>) {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field: { onBlur, onChange: onFieldChange } }) => (
            <div className={`user-input__upload--image ${className}`}>
               {children}
               <input
                  style={{ display: 'none' }}
                  type='file'
                  name={name}
                  id={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                     if (onChange) onChange(e);
                     const file = e.target.files && e.target.files[0];
                     if (file) onFieldChange(file);
                  }}
                  onBlur={onBlur}
               />
            </div>
         )}
      />
   );
}
