import Children from './Children';

import { AFFILIATE_DEPTH } from '../../utils/constants';
import Loader from '../../ui/Loader';

import { useAppSelector } from '../../redux-hooks';
import { UserProfileData } from '../../interfaces/AuthInterfaces';
import { useTranslation } from 'react-i18next';

export default function Team() {
   const user = useAppSelector(state => state.auth.user);

   const { t } = useTranslation();

   if (!user) return <Loader size={100} />;

   const renderLevel = (level: number, index: number) => {
      const childrenKey = `children_level_${index + 1}` as keyof UserProfileData;

      return (
         <div className='team__level' key={index}>
            <div className='team__wrapper'>
               <span className='team__wrapper--level'>{`${level}. ${t('Level')}`}</span>
               <span className={`team__wrapper--members team__wrapper--members-${level}`}>
                  {t('Members')}
                  <span className='team__wrapper--members-num'>{(user[childrenKey] as string[])?.length}</span>
               </span>
            </div>
            <div className='team__users'>
               {(user[childrenKey] as string[])?.map((child: string) => (
                  <Children id={child} key={child} />
               ))}
            </div>
         </div>
      );
   };

   return (
      <div className='team'>{Array.from({ length: AFFILIATE_DEPTH }, (_, index) => renderLevel(index + 1, index))}</div>
   );
}
