import Adam from '@/ui/Table/Adam';
import Table from '@/ui/Table/Table';

export default function Reseller() {
   return (
      <div className='reseller'>
         <h1 className='heading-primary'>Adam</h1>
         <Adam />
         <h1 className='heading-primary'>Viszonteladók</h1>
         <Table />
      </div>
   );
}
