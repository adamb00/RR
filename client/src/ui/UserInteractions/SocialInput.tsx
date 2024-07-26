import { SocialIcon } from 'react-social-icons';
import { Control, Controller } from 'react-hook-form';
import useDeviceDetection from '@/hooks/useDetectDevice';
import useDetectOrientation from '@/hooks/useDetectOrientation';

export default function SocialInput({
   control,
   name,
   defaultValue,
   disabled,
}: {
   control: Control;
   name: string;
   defaultValue: string;
   disabled: boolean;
}) {
   const device = useDeviceDetection();
   const orientation = useDetectOrientation();

   const getStyleForDeviceAndOrientation = (device: string, orientation: string): React.CSSProperties => {
      if (device === 'Desktop' && orientation === 'landscape') {
         return { padding: '2rem' };
      } else if (device === 'Desktop') {
         return { padding: '3rem' };
      } else if (device === 'Tablet') {
         return { padding: '3rem' };
      } else {
         return { padding: '3rem' };
      }
   };

   const iconStyle = getStyleForDeviceAndOrientation(device, orientation);

   return (
      <div className='social-modal__wrapper'>
         <SocialIcon network={name} as='span' style={iconStyle} />
         <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field: { value, onChange: onFieldChange } }) => (
               <input
                  autoComplete='off'
                  id='name'
                  autoFocus={false}
                  onChange={e => {
                     onFieldChange(e);
                  }}
                  disabled={disabled}
                  defaultValue={value}
                  className='social-modal__input'
               />
            )}
         />
      </div>
   );
}
