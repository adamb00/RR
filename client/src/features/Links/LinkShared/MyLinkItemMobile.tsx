import { ILink } from '@/interfaces/ILink';

export default function MyLinkItemMobile({ link }: { link: ILink }) {
   return (
      <div className='my-link'>
         <div className='my-link__header'>
            <img src={link.images[0]} alt={link.description} className='my-link__image my-link__image--mobile' />

            <div className='my-link__header--wrapper'>
               <h1 className='heading-primary heading-primary--small'>{link.title}</h1>
               <div className='my-link__header--desc'>{link.description}</div>
            </div>
         </div>
         <div className='my-link__container'>
            <iframe
               width='120'
               height='220'
               src={link.video}
               title={link.description}
               allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
               allowFullScreen
            ></iframe>
            <img src={link.images[2]} alt={link.description} className='my-link__image' />
         </div>
      </div>
   );
}
