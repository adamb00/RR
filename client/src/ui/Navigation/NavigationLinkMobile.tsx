import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationLinkMobileProps {
   to: string;
   onClick: () => void;
}

export default function NavigationLinkMobile({ children, to, onClick }: PropsWithChildren<NavigationLinkMobileProps>) {
   return (
      <NavLink className='navigation__link' to={to} onClick={onClick}>
         {children}
      </NavLink>
   );
}
