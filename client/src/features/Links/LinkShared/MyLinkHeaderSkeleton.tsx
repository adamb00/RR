import Skeleton from 'react-loading-skeleton';

export default function MyLinkHeaderSkeleton() {
   return (
      <div className='shared-link__header'>
         <div className='shared-link__image'>
            <Skeleton circle={true} height='120px' width='120px' />
         </div>
         <div className='shared-link__header--wrapper'>
            <div className='shared-link__username'>
               <Skeleton count={1} />
            </div>
            <div className='sharemodal__container__wrapper'>
               <div className='sharemodal__container--item'>
                  <Skeleton circle={true} height='44px' width='44px' />
               </div>
               <div className='sharemodal__container--item'>
                  <Skeleton circle={true} height='44px' width='44px' />
               </div>
               <div className='sharemodal__container--item'>
                  <Skeleton circle={true} height='44px' width='44px' />
               </div>
               <div className='sharemodal__container--item'>
                  <Skeleton circle={true} height='44px' width='44px' />
               </div>
            </div>
         </div>
      </div>
   );
}
