import { Dispatch, SetStateAction } from 'react';
import { Language } from './LanguageChangerModal';
import { useTranslation } from 'react-i18next';

interface LanguageChangerModalItemProps {
   language: Language;
   setShowModal: Dispatch<SetStateAction<boolean>>;
}
export default function LanguageChangerModalItem({ language, setShowModal }: LanguageChangerModalItemProps) {
   const { i18n } = useTranslation();

   const handleOnClick = () => {
      try {
         i18n.changeLanguage(language.code);
      } finally {
         setShowModal(false);
      }
   };

   return (
      <div onClick={handleOnClick} className='language__modal--item'>
         <span className={`flag-icon flag-icon-${language.country_code} language__modal--flag`}></span>
         <span className={`language__modal--name`}>{language.name}</span>
      </div>
   );
}
