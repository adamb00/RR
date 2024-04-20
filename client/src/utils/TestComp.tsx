import { useForm } from 'react-hook-form';

export default function TestComp() {
   const { handleSubmit } = useForm();
   const handleOnSubmitHttps = async () => {
      const res = await fetch('https://r2byou.com/api/v1/user/mark-notifications', { method: 'POST' });
      console.log(res);
   };

   const handleOnSubmitNoHookFormHttps = async () => {
      const res = await fetch('https://r2byou.com/api/v1/user/mark-notifications', { method: 'POST' });
      console.log(res);
   };

   const body = {
      link: 'https://magiceden.io/launchpad',
      title: 'Magic Eden',
   };

   const handleOnSubmitHttpsLink = async () => {
      const res = await fetch('https://r2byou.com/api/v1/link', {
         method: 'POST',
         body: JSON.stringify(body),
      });
      console.log(res);
   };

   return (
      <>
         <button onClick={handleSubmit(handleOnSubmitHttps)}>PressHttps</button>
         <button onClick={handleOnSubmitNoHookFormHttps}>PressNoHookformHttps</button>
         <button onClick={handleSubmit(handleOnSubmitHttpsLink)}>PressHttpsLink</button>
      </>
   );
}
