import Skeleton from 'react-loading-skeleton';

export default function LinksSkeleton() {
   return (
      <div className='links__container'>
         {Array.from({ length: 4 }, (_, i) => i).map(i => (
            <Skeleton count={1} key={i} />
         ))}
      </div>
   );
}
