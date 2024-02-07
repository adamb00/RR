import { useForm } from 'react-hook-form';
import UserInput from '../../ui/UserInteractions/UserInput';

export default function UpdateUser() {
   const { control } = useForm();
   return <div>{/* <UserInput control={control} name='name' /> */}</div>;
}
