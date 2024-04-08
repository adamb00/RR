import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTheme } from '../../context/ThemeContext';
import { SparklesCore } from '../../ui/Aceternity/Sparkles';
import axios from 'axios';

export default function HomeNoAuth() {
   const { theme } = useTheme(),
      isDark = theme === 'dark';

   const { control, handleSubmit } = useForm();
   const handleOnSubmit = async (data: FieldValues) => {
      const res = await axios.post(import.meta.env.VITE_BASE_URL + '/link', data);
      console.log(res);
   };

   return (
      <>
         <div className='home__no-auth'>
            <div className='home__no-auth--container'>
               <SparklesCore
                  id='tsparticlesfullpage'
                  background='transparent'
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={100}
                  className='w-full h-full'
                  particleColor={isDark ? '#8debcf' : '#ed535b'}
               />
            </div>
            <h1 className='heading-primary'>Here comes some fancy title</h1>
         </div>
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
      </>
   );
}
