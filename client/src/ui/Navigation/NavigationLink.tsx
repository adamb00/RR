import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
   to: string;
   className?: string;
}

export default function NavigationLink({ children, to, className }: PropsWithChildren<NavigationLinkProps>) {
   return (
      <NavLink
         className={({ isActive }) =>
            isActive
               ? `header-nav__item header-nav__item--active ${className}--active`
               : `header-nav__item ${className}`
         }
         to={to}
      >
         {children}
      </NavLink>
   );
}
