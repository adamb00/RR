import './styles/main.scss';
import { Routes, Route } from 'react-router-dom';

import AppLayout from './ui/AppLayout';
import SignIn from './features/Auth/SignIn';
import Home from './features/Home/Home';

import Account from './features/Account/Account';
import Notifications from './features/Notifications/Notifications';
import PersonalInformation from './features/Account/PersonalInformation';
import Security from './features/Account/Security';
import NotificationItem from './features/Notifications/NotificationItem';
import MyLink from './features/Links/LinkShared/MyLink';
import About from './features/About/About';
import SignUp from './features/Auth/SignUp';
import Affiliate from './features/Affiliate/Affiliate';
import FAQ from './features/FAQ/FAQ';
import Contact from './features/Contact/Contact';
import ActivateAccount from './ui/ActivateAccount';
import ForgotPassword from './features/Auth/ForgotPassword';
import ResetPassword from './features/Auth/ResetPassword';

import RequireAuth from './ui/RequireAuth';
import RestrictedRoute from './ui/RestrictedRoute';
import Links from './features/Links/Links';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
   .use(initReactI18next)
   .use(LanguageDetector)
   .use(HttpApi)
   .init({
      // supportedLngs: ['hu', 'en', 'fr', 'it'],
      supportedLngs: ['hu'],
      fallbackLng: 'hu',
      detection: {
         order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
         caches: ['cookie', 'localStorage'],
      },
      backend: {
         loadPath: '/locales/{{lng}}/translation.json',
      },
      react: { useSuspense: false },
   });

export default function App() {
   return (
      <Routes>
         <Route path='/' element={<AppLayout />}>
            {/* NON AUTHENTICATED ROUTES */}
            <Route path='signin' element={<SignIn />} />
            <Route path='/' element={<Home />} />

            <Route path='/:username' element={<MyLink />} />
            <Route path='about' element={<About />} />
            <Route path='affiliate' element={<Affiliate />} />
            <Route path='faq' element={<FAQ />} />
            <Route path='contact' element={<Contact />} />
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
               </Route>
            </Route>

            <Route path='*' element={<RestrictedRoute />} />
         </Route>
      </Routes>
   );
}
