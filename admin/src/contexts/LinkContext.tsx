import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { ILink } from '@/interfaces/ILink';
import { useGetLinksMutation } from '@/features/Links/linkApiSlice';

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

   useEffect(() => {
      const fetchLinks = async () => {
         try {
            const result = await getLinks({}).unwrap();
            setLinks(result.doc);
         } catch (error) {
            console.error('Failed to fetch links:', error);
         }
      };

      fetchLinks();
   }, [getLinks]);

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
