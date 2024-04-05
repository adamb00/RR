import Skeleton from 'react-loading-skeleton';

export default function MyLinkItemSkeleton() {
   return (
      <div className='shared-link__container'>
         {Array.from({ length: 4 }, (_, i) => i).map(i => (
            <Skeleton count={1} height='445px' borderRadius='0.8rem' width='1000px' key={i} />
         ))}
      </div>
   );
}
