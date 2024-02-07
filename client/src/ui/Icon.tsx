import { PropsWithChildren } from 'react';

interface IconProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function Icon({ children, className }: PropsWithChildren<IconProps>) {
   return <div className={`icon ${className}`}>{children}</div>;
}
