import { updateUser } from '../features/Auth/slices/auth/authSlice';
import { useEffect, useState } from 'react';
import { ILink } from '../interfaces/ILink';
import { useAppDispatch } from '../redux-hooks';
import { UserProfileData } from '../interfaces/AuthInterfaces';
import { useUpdateUserMutation } from '../features/Auth/slices/user/userApiSlice';
// import { socket } from '../utils/constants';
import { isEqual } from 'lodash';

interface UpdateLinkPositionProps {
   user: UserProfileData | null;
}
export const useUpdateLinkPosition = ({ user }: UpdateLinkPositionProps) => {
   const dispatch = useAppDispatch();
   const [sortedLinks, setSortedLinks] = useState<ILink[]>([]);
   const [updateUserApi, { isLoading }] = useUpdateUserMutation();

   useEffect(() => {
      if (user && user.availableLinks) {
         const sortedLinks = [...user.availableLinks].sort((a, b) => a.order - b.order);
         if (!isEqual(sortedLinks, user.availableLinks)) {
            dispatch(updateUser({ ...user, availableLinks: sortedLinks }));
            setSortedLinks(sortedLinks);
         } else {
            setSortedLinks(sortedLinks);
         }
      }
   }, [dispatch, user]);

   // useEffect(() => {
   //    socket.on('link', (data: { id: string; data: object }) => {
   //       setSortedLinks(links =>
   //          links.map((link: ILink) => {
   //             if (link._id === data.id) {
   //                const updatedLink = { ...link, ...data.data };

   //                dispatch(
   //                   updateUser({
   //                      ...user,
   //                      availableLinks: sortedLinks.map(l => (l._id === updatedLink._id ? updatedLink : l)),
   //                   })
   //                );
   //                return updatedLink;
   //             }
   //             return link;
   //          })
   //       );
   //    });

   //    return () => {
   //       socket.off('link');
   //    };
   // }, [dispatch, sortedLinks, user]);

   const updateLinkPosition = async (currentPos: number, newPos: number) => {
      try {
         if (newPos === 0) {
            console.error('New position cannot be 0.');
            return (newPos = 1);
         }
         const updatedLinks = [...sortedLinks];
         const linkToMove = updatedLinks.splice(currentPos, 1)[0];
         updatedLinks.splice(newPos, 0, linkToMove);

         if (linkToMove.order !== 0) {
            const updatedLinksWithOrder = updatedLinks.map((link, index) => ({
               ...link,
               order: index + 1,
            }));

            setSortedLinks(() => updatedLinksWithOrder);
            await updateUserApi({
               id: user!._id,
               data: { availableLinks: updatedLinksWithOrder },
            });

            dispatch(updateUser({ ...user, availableLinks: updatedLinksWithOrder }));
         }

         // const updatedLinksWithOrder = updatedLinks.map((link, index) => ({
         //    ...link,
         //    order: index + 1,
         // }));

         // setSortedLinks(() => updatedLinksWithOrder);
         // await updateUserApi({
         //    id: user!._id,
         //    data: { availableLinks: updatedLinksWithOrder },
         // });

         // dispatch(updateUser({ ...user, availableLinks: updatedLinksWithOrder }));
      } catch (error) {
         console.error('Error updating link position:', error);
      }
   };

   const handlePosChange = (currentPos: number, newPos: number) => {
      updateLinkPosition(currentPos, newPos);
   };

   return { isLoading, sortedLinks, handlePosChange };
};
