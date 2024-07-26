import { useOutsideClick } from '@/hooks/useOutsideClick';
import { MenuProps } from '@/interfaces/MenuProps';
import { FieldValues, useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '@/features/Auth/slices/user/userApiSlice';
import { UserProfileData } from '@/interfaces/AuthInterfaces';

import { useDispatch } from 'react-redux';
import { updateUser } from '@/features/Auth/slices/auth/authSlice';
import Button from '../Buttons/Button';
import SocialInput from '../UserInteractions/SocialInput';

import Select, { SingleValue } from 'react-select';
import { useEffect, useMemo, useState } from 'react';

interface SocialModalProps extends MenuProps {
   user: UserProfileData;
}

interface Option {
   value: string;
   label: string;
}

export default function SocialModal({ isOpen, setIsOpen, user }: SocialModalProps) {
   const handleCloseModal = () => setIsOpen(open => !open);
   const ref = useOutsideClick(handleCloseModal);
   const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null);

   const [updateUserAPI] = useUpdateUserMutation();
   const { socialLinks, _id } = user;

   const dispatch = useDispatch();

   const { handleSubmit, control } = useForm();

   const options: Option[] = useMemo(
      () => [
         { value: 'youtube', label: 'Youtube' },
         { value: 'facebook', label: 'Facebook' },
         { value: 'tiktok', label: 'Tik Tok' },
         { value: 'instagram', label: 'Instagram' },
      ],
      []
   );

   useEffect(() => {
      const userLink = socialLinks.find(link => link.default !== true) || null;
      if (userLink) {
         const selectedOptionUser = options.find(option => option.value === userLink.platform) || null;

         if (selectedOptionUser) setSelectedOption(selectedOptionUser);
      }
   }, [socialLinks, options]);

   const handleOnSubmit = async (data: FieldValues) => {
      // const updatedData = Object.entries(data)
      //    /* eslint-disable-next-line */
      //    .filter(([_, url]) => url !== '')
      //    .map(([platform, url]) => ({
      //       platform,
      //       url,
      //       default: false,
      //    }));
      // console.log(updatedData);
      // const links = [...socialLinks.filter(link => link.default), ...updatedData];
      // reset();
      // console.log(links);
      // const res = await updateUserAPI({
      //    data: { socialLinks: links },
      //    id: _id,
      // }).unwrap();
      // dispatch(updateUser({ ...res.data.data }));

      const existingNonDefaultLink = socialLinks.find(link => link.default !== true);

      const newLink = {
         _id: existingNonDefaultLink?._id,
         platform: selectedOption?.value,
         url: data[selectedOption?.value || ''],
         default: false,
      };

      const links = [...socialLinks.filter(link => link.default), newLink];

      const res = await updateUserAPI({
         data: { socialLinks: links },
         id: _id,
      }).unwrap();
      dispatch(updateUser({ ...res.data.data }));
   };

   if (!isOpen) return;
   return (
      <div className='overlay'>
         <div className='social-modal' ref={ref}>
            <div className='close' onClick={handleCloseModal}>
               &#10005;
            </div>
            <h1 className='heading-primary'>Share your pages</h1>
            <div className='social-modal__body'>
               <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options} />

               {selectedOption && (
                  <SocialInput
                     control={control}
                     disabled={false}
                     name={selectedOption.value}
                     defaultValue={socialLinks.find(link => link.default !== true)?.url || ''}
                  />
               )}
            </div>
            <Button className='btn btn--primary' onClick={handleSubmit(handleOnSubmit)}>
               Submit
            </Button>
         </div>
      </div>
   );
}
