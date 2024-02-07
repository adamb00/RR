import { PropsWithChildren } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

// interface NavigationLinkProps extends NavLinkProps {
//    // to: string;
//    // className?: string;
//    // onClick?: () => void;
// }

export default function NavigationLink({ children, to, className, onClick }: PropsWithChildren<NavLinkProps>) {
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
