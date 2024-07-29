import { ILink } from '@/interfaces/ILink';

export default function MyLinkItem({ link }: { link: ILink }) {
   return (
      <div className='my-link'>
         <div className='my-link__header'>
            <iframe
               className='my-link__video'
               src={link.video}
               title={link.description}
               allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
               allowFullScreen
            ></iframe>

            <div className='my-link__header--wrapper'>
               <h1 className='heading-primary heading-primary--small'>{link.title}</h1>
               <div className='my-link__header--desc'>{link.description}</div>
            </div>
         </div>
         <div className='my-link__container'>
            <img src={link.images[0]} alt={link.description} className='my-link__image my-link__image--0' />
            <img src={link.images[2]} alt={link.description} className='my-link__image my-link__image--2' />
            <img src={link.images[1]} alt={link.description} className='my-link__image my-link__image--1' />
         </div>
      </div>
   );
}
