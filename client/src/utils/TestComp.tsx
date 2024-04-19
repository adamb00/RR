import { useForm } from 'react-hook-form';

export default function TestComp() {
   const { handleSubmit } = useForm();
   const handleOnSubmitHttps = async () => {
      const res = await fetch('https://r2byou.com/api/v1/user/mark-notifications');
      console.log(res);
   };
   const handleOnSubmitHttpsNoApiV1 = async () => {
      const res = await fetch('https://r2byou.com/user/mark-notifications');
      console.log(res);
   };
   const handleOnSubmitHttp = async () => {
      const res = await fetch('http://165.227.173.40:8000/api/v1/user/mark-notifications');
      console.log(res);
   };
   const handleOnSubmitNoHookFormHttps = async () => {
      const res = await fetch('https://r2byou.com/api/v1/user/mark-notifications');
      console.log(res);
   };
   const handleOnSubmitNoHookFormHttp = async () => {
      const res = await fetch('http://165.227.173.40:8000/api/v1/user/mark-notifications');
      console.log(res);
   };
   return (
      <>
         <button onClick={handleSubmit(handleOnSubmitHttps)}>PressHttps</button>
         <button onClick={handleSubmit(handleOnSubmitHttpsNoApiV1)}>PressHttpsNoApiV1</button>
         <button onClick={handleSubmit(handleOnSubmitHttp)}>PressHttp</button>
         <button onClick={handleOnSubmitNoHookFormHttps}>PressNoHookformHttps</button>
         <button onClick={handleOnSubmitNoHookFormHttp}>PressNoHookformHttp</button>
      </>
   );
}
