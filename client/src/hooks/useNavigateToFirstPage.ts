import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigateToFirtsPage = (count: number, currentPage: number, pageCount: number) => {
   const navigation = useNavigate();
   const handleRedirect = useCallback(() => {
      if (currentPage > pageCount && pageCount <= 1) {
         navigation('/my-links');
      }
   }, [currentPage, navigation, pageCount]);

   useEffect(() => {
      handleRedirect();
   }, [count, handleRedirect]);

   return { handleRedirect };
};
