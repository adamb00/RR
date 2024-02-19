import { Dispatch, SetStateAction } from 'react';
import LanguageChangerModalItem from './LanguageChangerModalItem';

interface LanguageChangerModalProps {
   setShowModal: Dispatch<SetStateAction<boolean>>;
}

export interface Language {
   code: string;
   name: string;
   country_code: string;
}
const supportedLanguages: Language[] = [
   { code: 'fr', name: 'Français', country_code: 'fr' },
   { code: 'en', name: 'English', country_code: 'gb' },
   { code: 'hu', name: 'Magyar', country_code: 'hu' },
   { code: 'it', name: 'Italiano', country_code: 'it' },
];
export default function LanguageChangerModal({ setShowModal }: LanguageChangerModalProps) {
   return (
      <div className='language__modal'>
         <div className='language__modal--content'>
            {supportedLanguages.map((language: Language) => (
               <LanguageChangerModalItem language={language} setShowModal={setShowModal} key={language.code} />
            ))}
         </div>
      </div>
   );
}
