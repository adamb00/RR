/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextProps {
   placeholder?: string;
   name: string;
   control: Control;
   rules?: RegisterOptions;
   className?: string;
   fieldErrorClassname?: string;
}

//TODO TRANSLATE IF POSSIBLE

export default function RichText({ control, name, rules, fieldErrorClassname, className, placeholder }: RichTextProps) {
   const quill = useRef<any>(null);

   const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'color', 'clean'];

   const modules = useMemo(
      () => ({
         toolbar: {
            container: [
               [{ header: [1, 2, 3, 4, 5, 6, false] }],
               ['bold', 'italic', 'underline'],
               [{ color: [] }],
               [{ list: 'bullet' }],
               ['link'],
            ],
         },
         clipboard: {
            matchVisual: true,
         },
      }),
      []
   );

   return (
      <Controller
         control={control}
         name={name}
         rules={rules}
         render={({ field: { value, onChange, onBlur }, fieldState: { error: fieldError } }) => (
            <>
               <ReactQuill
                  ref={(el: any) => (quill.current = el)}
                  className={className}
                  theme='snow'
                  value={value}
                  formats={formats}
                  modules={modules}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder={placeholder}
               />
               {fieldError && (
                  <p className={fieldErrorClassname}>
                     {fieldError.message || 'Something went wrong. Please try again.'}
                  </p>
               )}
            </>
         )}
      />
   );
}
