import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
   to: string;
}

export default function NavigationLink({ children, to }: PropsWithChildren<NavigationLinkProps>) {
   return (
      <NavLink
         className={({ isActive }) => (isActive ? 'header-nav__item header-nav__item--active' : 'header-nav__item')}
         to={to}
      >
         {children}
      </NavLink>
   );
}
