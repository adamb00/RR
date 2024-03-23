import './styles/main.scss';
import '../node_modules/flag-icon-css/css/flag-icons.min.css';

import AppLayout from './ui/AppLayout';
import MyLink from './features/Links/MyLink';
import About from './features/About/About';
import SignIn from './features/Auth/SignIn';
import SignUp from './features/Auth/SignUp';
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

import { Routes, Route } from 'react-router-dom';

import RequireAuth from './ui/RequireAuth';
import RestrictedRoute from './ui/RestrictedRoute';
import Home from './features/Home/Home';
import Links from './features/Links/Links';
import ForgotPassword from './features/Auth/ForgotPassword';
import ResetPassword from './features/Auth/ResetPassword';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
   .use(initReactI18next)
   .use(LanguageDetector)
   .use(HttpApi)
   .init({
      supportedLngs: ['en', 'hu', 'fr', 'it'],
      fallbackLng: 'en',
      detection: {
         order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
         caches: ['cookie', 'localStorage'],
      },
      backend: {
         loadPath: '/assets/locales/{{lng}}/translation.json',
      },
      react: { useSuspense: false },
   });

export default function App() {
   return (
      <Routes>
         <Route path='/' element={<AppLayout />}>
            {/* NON AUTHENTICATED ROUTES */}

            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<MyLink />} />
            <Route path='about' element={<About />} />
            <Route path='affiliate' element={<Affiliate />} />
            <Route path='faq' element={<FAQ />} />
            <Route path='contact' element={<Contact />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='signup/:refCode' element={<SignUp />} />
            <Route path='activate-account/:token' element={<ActivateAccount />} />
            <Route path='unauthorized' element={<RestrictedRoute />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password/:token' element={<ResetPassword />} />

            {/* AUTHENTICATED ROUTES */}
            <Route element={<RequireAuth allowedRoles={['User', 'Admin']} />}>
               <Route path='/' element={<Home />} />
               <Route path='my-links' element={<Links />} />
               <Route path='account' element={<Account />}>
                  <Route path='notifications/:id' element={<NotificationItem />} />
                  <Route path='personal' element={<PersonalInformation />} />
                  <Route path='security' element={<Security />} />
                  <Route path='notifications' element={<Notifications />} />

                  {/* ADMIN ROUTES */}
                  <Route element={<RequireAuth allowedRoles={['Admin']} />}>
                     <Route path='edit-links' element={<EditLinks />} />
                  </Route>
               </Route>
            </Route>

            <Route path='*' element={<RestrictedRoute />} />
         </Route>
      </Routes>
   );
}
