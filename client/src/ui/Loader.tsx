import PuffLoader from 'react-spinners/PuffLoader';

export default function Loader() {
   return (
      <div className='loader'>
         <PuffLoader color={'#000'} loading={true} size={250} aria-label='Loading Spinner' data-testid='loader' />
      </div>
   );
}
