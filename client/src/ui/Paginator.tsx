import Button from './Buttons/Button';
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { ITEM_PER_PAGE } from '../utils/constants';
// import { SetURLSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useNavigateToFirtsPage } from '../hooks/useNavigateToFirstPage';

interface PaginatorProps {
   count: number;
   // currentPage: number;
   // searchParams: URLSearchParams;
   // setSearchParams: SetURLSearchParams;
}

// export default function Paginator({ count, currentPage, searchParams, setSearchParams }: PaginatorProps) {
export default function Paginator({ count }: PaginatorProps) {
   const [searchParams, setSearchParams] = useSearchParams();
   const currentPage = useMemo(
      () => (!searchParams.get('page') ? 1 : Number(searchParams.get('page'))),
      [searchParams]
   );
   const pageCount = useMemo(() => Math.ceil(count / ITEM_PER_PAGE), [count]);

   const firstPage = () => {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
   };

   const nextPage = () => {
      const next = currentPage === pageCount ? currentPage : currentPage + 1;

      searchParams.set('page', next.toString());
      setSearchParams(searchParams);
   };

   const prevPage = () => {
      const prev = currentPage === 1 ? currentPage : currentPage - 1;

      searchParams.set('page', prev.toString());
      setSearchParams(searchParams);
   };

   const lastPage = () => {
      searchParams.set('page', pageCount.toString());
      setSearchParams(searchParams);
   };

   useNavigateToFirtsPage(count, currentPage, pageCount);

   if (pageCount <= 1) {
      return;
   }

   return (
      <div className='paginator'>
         <div className='paginator__back'>
            <Button disabled={currentPage === 1} onClick={firstPage} className='btn btn--paginator'>
               <HiChevronDoubleLeft className='paginator__icon' />
            </Button>
            <Button disabled={currentPage === 1} onClick={prevPage} className='btn btn--paginator'>
               <HiChevronLeft className='paginator__icon' />
            </Button>
         </div>
         <div className='paginator__forward'>
            <Button disabled={currentPage === pageCount} onClick={nextPage} className='btn btn--paginator'>
               <HiChevronRight className='paginator__icon' />
            </Button>
            <Button disabled={currentPage === pageCount} onClick={lastPage} className='btn btn--paginator'>
               <HiChevronDoubleRight className='paginator__icon' />
            </Button>
         </div>
      </div>
   );
}
