import { Controller, FieldValues, useForm } from 'react-hook-form';
import './App.css';
import axios from 'axios';

function App() {
   const { control, handleSubmit } = useForm();
   const handleOnSubmit = async (data: FieldValues) => {
      const res = await axios.post(import.meta.env.VITE_BASE_URL + '/link', data);
      console.log(res);
   };
   return (
      <form onSubmit={handleSubmit(handleOnSubmit)}>
         <Controller
            name='link'
            control={control}
            render={({ field: { value, onChange } }) => (
               <input
                  defaultValue={value}
                  type='text'
                  placeholder='Link Title'
                  id='link'
                  onChange={e => onChange(e.target.value)}
               />
            )}
         />
      </form>
   );
}

export default App;
