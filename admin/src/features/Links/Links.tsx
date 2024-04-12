import { useLinks } from '@/contexts/LinkContext';
import LinksForm from './LinksForm';
import { ILink } from '@/interfaces/ILink';
import LinksItem from './LinksItem';

export default function Links() {
   const { links } = useLinks();
   return (
      <div className='links'>
         <LinksForm />
         <div className='links__container'>
            {links.map((link: ILink) => (
               <LinksItem key={link._id} link={link} />
            ))}
         </div>
      </div>
   );
}
