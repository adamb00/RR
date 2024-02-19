import { useMemo, useRef } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import QuillEditor from 'react-quill';
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
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const quill = useRef<any>(null);

   const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      // 'image',
      'color',
      'clean',
   ];

   // const imageHandler = useCallback(() => {
   //    if (quill.current) {
   //       const input = document.createElement('input');
   //       input.setAttribute('type', 'file');
   //       input.setAttribute('accept', 'image/*');
   //       input.click();

   //       input.onchange = () => {
   //          if (input.files && input.files.length > 0) {
   //             const file = input.files[0];
   //             const reader = new FileReader();

   //             reader.onload = () => {
   //                const imageUrl = reader.result;
   //                const quillEditor = quill.current!.getEditor();
   //                const range = quillEditor.getSelection(true);
   //                quillEditor.insertEmbed(range.index, 'image', imageUrl, 'user');
   //             };

   //             reader.readAsDataURL(file);
   //          }
   //       };
   //    }
   // }, []);

   const modules = useMemo(
      () => ({
         toolbar: {
            container: [
               [{ header: [1, 2, 3, 4, 5, 6, false] }],
               ['bold', 'italic', 'underline', 'blockquote'],
               [{ color: [] }],
               [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
               ['link'],
               // ['link', 'image'],
            ],
            // handlers: {
            //    image: imageHandler,
            // },
         },
         clipboard: {
            matchVisual: true,
         },
      }),
      []
      // [imageHandler]
   );

   return (
      <Controller
         control={control}
         name={name}
         rules={rules}
         render={({ field: { value, onChange, onBlur }, fieldState: { error: fieldError } }) => (
            <>
               <QuillEditor
                  ref={el => (quill.current = el)}
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
