import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { ILink } from '../interfaces/ILink';
import { useGetLinksMutation } from '../features/Links/linkApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/Auth/slices/auth/authSlice';

interface LinkContextType {
   links: ILink[];
   setLinks: Dispatch<SetStateAction<ILink[]>>;
   isLoading: boolean;
   removeLink: (linkId: string) => void;
   updateLink: (link: ILink) => void;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

const LinkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [links, setLinks] = useState<ILink[]>([]);
   const [getLinks, { isLoading }] = useGetLinksMutation();
   const user = useSelector(selectCurrentUser);

   useEffect(() => {
      if (user) {
         const fetchLinks = async () => {
            try {
               const response = await getLinks({}).unwrap();
               setLinks(response.doc);
            } catch (error) {
               console.error('Error fetching links:', error);
            }
         };

         fetchLinks();
      }
   }, [getLinks, user]);

   const updateLink = (updatedLink: ILink) => {
      setLinks(prevLinks => prevLinks.map(link => (link._id === updatedLink._id ? { ...link, ...updatedLink } : link)));
   };

   const removeLink = (linkId: string) => {
      setLinks(prevLinks => prevLinks.filter(link => link._id !== linkId));
   };

   const contextValue: LinkContextType = { links, setLinks, removeLink, updateLink, isLoading };

   return <LinkContext.Provider value={contextValue}>{children}</LinkContext.Provider>;
};

export const useLinks = () => {
   const context = useContext(LinkContext);
   if (context === undefined) throw new Error('LinkContext was use outside the LinkProvider');
   return context;
};

export { LinkContext, LinkProvider };
