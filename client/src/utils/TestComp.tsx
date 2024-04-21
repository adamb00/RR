import { useTestAuthMutation, useTestMutation } from '@/features/Auth/slices/user/userApiSlice';
import { useForm } from 'react-hook-form';

export default function TestComp() {
   const { handleSubmit } = useForm();
   const [testAuth] = useTestAuthMutation();
   const [test] = useTestMutation();
   const handleOnSubmitHttps = async () => {
      const res = await fetch('https://r2byou.com/api/v1/user/mark-notifications', { method: 'POST' });
      console.log(res);
   };

   const handleOnSubmitNoHookFormHttps = async () => {
      const res = await fetch('https://r2byou.com/api/v1/user/mark-notifications', { method: 'POST' });
      console.log(res);
   };
   const handleOnSubmitNoHookTest = async () => {
      const res = await fetch('https://r2byou.com/api/v1/user/test', { method: 'POST' });
      console.log(res);
   };
   const handleOnSubmitNoHookTestAuth = async () => {
      const res = await fetch('https://r2byou.com/api/v1/user/test-auth', { method: 'POST' });
      console.log(res);
   };

   const handleTestAuth = async () => {
      const res = await testAuth({}).unwrap();
      console.log(res);
   };
   const handleTest = async () => {
      const res = await test({}).unwrap();
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
         <button onClick={handleSubmit(handleOnSubmitNoHookTest)}>Test</button>
         <button onClick={handleSubmit(handleOnSubmitNoHookTestAuth)}>TestAuth</button>
         <button onClick={handleSubmit(handleTest)}>Handle Test</button>
         <button onClick={handleSubmit(handleTestAuth)}>Handle Test Auth</button>
      </>
   );
}
