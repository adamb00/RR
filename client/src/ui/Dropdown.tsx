import { Control, Controller } from 'react-hook-form';

interface DropdownProps {
   dropList: string[];
   name: string;
   control: Control;
}

export default function Dropdown({ dropList, control, name }: DropdownProps) {
   return (
      <div className='dropdown'>
         <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur } }) => (
               <select onBlur={onBlur} onChange={onChange} value={value || ''} className='dropdown__select'>
                  <option className='dropdown__option'>Please select</option>
                  {dropList.map(item => (
                     <option className='dropdown__option' key={item}>
                        {item}
                     </option>
                  ))}
               </select>
            )}
         />
      </div>
   );
}
