import { useAuth } from '../../context/AuthContext';
import PuffLoader from 'react-spinners/PuffLoader';
import Children from './Children';
import { UserData } from '../../interfaces/AuthInterfaces';
import { AFFILIATE_DEPTH } from '../../utils/constants';

// export default function Team() {
//    const { user } = useAuth();
//    if (!user) return <PuffLoader color='#ed535b' size={100} />;
//    return (
//       <div className='team'>
//          <div className='team__level'>
//             <div className='team__wrapper'>
//                <span className='team__wrapper--level'>1. level</span>
//                <span className='team__wrapper--members'>
//                   MEMBERS <span className='team__wrapper--members-num'>{user.children_level_1.length}</span>
//                </span>
//             </div>
//             <div className='team__users'>
//                {user.children_level_1.map((child: string) => (
//                   <Children id={child} key={child} />
//                ))}
//             </div>
//          </div>
//          <div className='team__level'>
//             <div className='team__wrapper'>
//                <span className='team__wrapper--level'>2. level</span>
//                <span className='team__wrapper--members'>
//                   MEMBERS <span className='team__wrapper--members-num'>{user.children_level_2.length}</span>
//                </span>
//             </div>
//             <div className='team__users'>
//                {user.children_level_2.map((child: string) => (
//                   <Children id={child} key={child} />
//                ))}
//             </div>
//          </div>
//          <div className='team__level'>
//             <div className='team__wrapper'>
//                <span className='team__wrapper--level'>3. level</span>
//                <span className='team__wrapper--members'>
//                   MEMBERS <span className='team__wrapper--members-num'>{user.children_level_3.length}</span>
//                </span>
//             </div>
//             <div className='team__users'>
//                {user.children_level_3.map((child: string) => (
//                   <Children id={child} key={child} />
//                ))}
//             </div>
//          </div>
//       </div>
//    );
// }

export default function Team() {
   const { user } = useAuth();

   if (!user) return <PuffLoader color='#ed535b' size={100} />;

   const renderLevel = (level: number, index: number) => {
      const childrenKey = `children_level_${index + 1}` as keyof UserData;

      return (
         <div className='team__level' key={index}>
            <div className='team__wrapper'>
               <span className='team__wrapper--level'>{`${level}. level`}</span>
               <span className='team__wrapper--members'>
                  MEMBERS
                  <span className='team__wrapper--members-num'>{(user[childrenKey] as string[])?.length}</span>
               </span>
            </div>
            <div className='team__users'>
               {(user[childrenKey] as string[])?.map((child: string) => (
                  <Children id={child} key={child} />
               ))}
            </div>
         </div>
      );
   };

   return (
      <div className='team'>{Array.from({ length: AFFILIATE_DEPTH }, (_, index) => renderLevel(index + 1, index))}</div>
   );
}
