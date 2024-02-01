import PuffLoader from 'react-spinners/PuffLoader';

interface LoaderProps {
   className?: string;
   isLoading?: boolean;
   size: number;
}

export default function Loader({ className, isLoading = true, size }: LoaderProps) {
   const theme = localStorage.getItem('theme');

   return (
      <div className={`loader ${className}`}>
         <PuffLoader
            color={JSON.parse(theme!) === 'light' ? ' #ed535b' : '#C0F4E5'}
            loading={isLoading}
            size={size}
            aria-label='Loading Spinner'
            data-testid='loader'
         />
      </div>
   );
}
