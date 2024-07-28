export default function AffiliateTable() {
   const products = [
      { name: 'Body Shaper', points: 7.2 },
      { name: 'Collagen', points: 4.1 },
      { name: 'Lady Harmonia', points: 4.4 },
      { name: 'Diétás shake', points: 5.5 },
      { name: 'C-vitamin', points: 1.1 },
      { name: 'BCAA', points: 3.3 },
   ];

   return (
      <div className='home__table'>
         <h1 className='heading-primary'>Termékek után járó pontok</h1>
         <table className='home__table--table'>
            <thead className='home__table--head'>
               <tr className='home__table--row'>
                  <th className='home__table--header'>Termék neve</th>
                  <th className='home__table--header'>Termék után járó pontok</th>
               </tr>
            </thead>
            <tbody className='home__table--body'>
               {products.map(row => (
                  <tr className='home__table--row'>
                     <td className='home__table--data'>{row.name}</td>
                     <td className='home__table--data'>{row.points}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
