import { Dispatch, SetStateAction } from 'react';

export interface MenuProps {
   setIsOpen: Dispatch<SetStateAction<boolean>>;
   isOpen: boolean;
   setOutterModal?: Dispatch<SetStateAction<boolean>>;
}
