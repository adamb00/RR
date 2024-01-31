// import { UserData } from '../../../interfaces/AuthInterfaces';
// import { useSortedNotifications } from '../../../hooks/useSortedNotifications';
// import { useAuth } from '../../../context/AuthContext';
// import Table from '../../../ui/Table';
// import Paginator from '../../../ui/Paginator';
// import NotificationsTableRow from './NotificationsTableRow';
// import { useMemo } from 'react';
// import { ITEM_PER_PAGE } from '../../../utils/constants';
// import { useSearchParams } from 'react-router-dom';

// export default function NotificationsTable() {
//    const { user } = useAuth();
//    const { sortedNotifications } = useSortedNotifications(user as UserData);
//    const count = sortedNotifications?.length || 0;

//    const [searchParams, setSearchParams] = useSearchParams();
//    const currentPage = useMemo(
//       () => (!searchParams.get('page') ? 1 : Number(searchParams.get('page'))),
//       [searchParams]
//    );

//    return (
//       <>
//          <Table>
//             <Table.Header>
//                <Table.Row>
//                   <th>Index</th>
//                   <th>Title</th>
//                   <th>Created by</th>
//                   <th>Created At</th>
//                </Table.Row>
//             </Table.Header>
//             <Table.Body>
//                {sortedNotifications?.map((element, index) => (
//                   <NotificationsTableRow
//                      element={element}
//                      index={(currentPage - 1) * ITEM_PER_PAGE + index}
//                      key={index}
//                   />
//                ))}
//             </Table.Body>
//          </Table>
//          <Paginator
//             count={count}
//             currentPage={currentPage}
//             searchParams={searchParams}
//             setSearchParams={setSearchParams}
//          />
//       </>
//    );
// }
