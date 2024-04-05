import { PropsWithChildren, useEffect, useState } from 'react';
import { ILink } from '../interfaces/ILink';
import { getLinkImage } from '../services/apiLinks';

interface LinkImageProps extends React.ComponentPropsWithoutRef<'img'> {
   link: ILink;
}
export default function LinkImage({ link, className }: PropsWithChildren<LinkImageProps>) {
   const linkPhoto = link.image;
   const [linkImage, setLinkImage] = useState<string | undefined>(linkPhoto);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   useEffect(() => {
      const fetchLinkImage = async () => {
         try {
            if (linkPhoto) {
               setIsLoading(true);
               const image = await getLinkImage(linkPhoto);
               setLinkImage(image);
            }
         } catch (error) {
            console.error('Error fetching link image:', error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchLinkImage();
   }, [linkPhoto]);

   if (isLoading) return isLoading;
   if (!linkImage) return;

   return <img className={className} src={linkImage} alt='Link image' />;
}
