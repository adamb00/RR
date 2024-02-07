import { Control, Controller } from 'react-hook-form';

interface UploadImageProps extends React.ComponentPropsWithoutRef<'input'> {
   control: Control;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   name: string;
}

export default function UserImageInput({ control, name, onChange }: UploadImageProps) {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field: { onChange: onFieldChange, onBlur }, fieldState: { error: fieldError } }) => (
            <div className='user-input__upload--image'>
               <input
                  type='file'
                  name={name}
                  id='image'
                  onChange={e => {
                     if (onChange) onChange(e);
                     const file = e.target.files && e.target.files[0];
                     if (file) {
                        onFieldChange(file);
                     }
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
