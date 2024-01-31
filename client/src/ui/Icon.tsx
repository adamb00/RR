import { PropsWithChildren } from 'react';

interface IconProps {
   className?: string;
}

export default function Icon({ children, className }: PropsWithChildren<IconProps>) {
   return <div className={`icon ${className}`}>{children}</div>;
}
