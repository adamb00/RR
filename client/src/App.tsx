import './styles/main.scss';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AppLayout from './ui/AppLayout';
import Home from './features/Home/Home';
import MyLink from './features/Links/MyLink';
import About from './features/About/About';
import SignIn from './features/Auth/SignIn';
import SignUp from './features/Auth/SignUp';
import Links from './features/Links/Links';
import Account from './features/Account/Account';

import Notifications from './features/Notifications/Notifications';
import PersonalInformation from './features/Account/PersonalInformation';
import Security from './features/Account/Security';
import EditLinks from './features/Account/EditLinks';
import Affiliate from './features/Affiliate/Affiliate';
import FAQ from './features/FAQ/FAQ';
import Contact from './features/Contact/Contact';
import NotificationItem from './features/Notifications/NotificationItem';
import ActivateAccount from './ui/ActivateAccount';
import { memo } from 'react';

const router = createBrowserRouter([
   {
      element: <AppLayout />,
      children: [
         { path: '/:id', element: <MyLink /> },
         {
            path: '/',
            element: <Home />,
         },
         {
            path: '/about',
            element: <About />,
         },
         {
            path: '/affiliate',
            element: <Affiliate />,
         },
         {
            path: '/faq',
            element: <FAQ />,
         },
         {
            path: '/contact',
            element: <Contact />,
         },
         { path: '/signin', element: <SignIn /> },
         { path: '/activate-account/:token', element: <ActivateAccount /> },
         { path: '/signup', element: <SignUp /> },
         { path: '/my-links', element: <Links /> },
         {
            path: '/account',
            element: <Account />,
            children: [
               {
                  path: 'edit-links',
                  element: <EditLinks />,
               },
               {
                  path: 'notifications/:id',
                  element: <NotificationItem />,
               },
               {
                  path: 'notifications',
                  element: <Notifications />,
               },
               {
                  path: 'personal',
                  element: <PersonalInformation />,
               },
               {
                  path: 'security',
                  element: <Security />,
               },
            ],
         },
      ],
   },
]);
export default memo(function App() {
   return <RouterProvider router={router} />;
});
