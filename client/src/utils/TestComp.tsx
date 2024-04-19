import { useForm } from 'react-hook-form';

export default function TestComp() {
   const { handleSubmit } = useForm();
   const handleOnSubmit = async () => {
      const res = await fetch('https://r2byou.com/api/v1/user/mark-notifications');
      console.log(res);
   };
   return <button onClick={handleSubmit(handleOnSubmit)}>Press</button>;
}
