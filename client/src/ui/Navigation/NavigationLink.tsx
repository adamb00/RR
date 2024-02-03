import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
   to: string;
   className?: string;
   onClick?: () => void;
}

export default function NavigationLink({ children, to, className, onClick }: PropsWithChildren<NavigationLinkProps>) {
   return (
      <NavLink
         onClick={onClick}
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
