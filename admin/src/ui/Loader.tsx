import PuffLoader from 'react-spinners/PuffLoader';

interface LoaderProps extends React.ComponentPropsWithoutRef<'div'> {
   isLoading?: boolean;
   size: number;
}

export default function Loader({ className, isLoading = true, size }: LoaderProps) {
   return (
      <div className={`loader ${className}`}>
         <PuffLoader
            color='#ed535b'
            loading={isLoading}
            size={size}
            aria-label='Loading Spinner'
            data-testid='loader'
         />
      </div>
   );
}
