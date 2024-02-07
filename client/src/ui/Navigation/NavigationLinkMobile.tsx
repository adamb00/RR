import { PropsWithChildren } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export default function NavigationLinkMobile({ children, to, onClick }: PropsWithChildren<NavLinkProps>) {
   return (
      <NavLink className='navigation__link' to={to} onClick={onClick}>
         {children}
      </NavLink>
   );
}
