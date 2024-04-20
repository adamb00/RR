import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/styles/main.scss';
import { store, persistor } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LinkProvider } from './contexts/LinkContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <LinkProvider>
               <PersistGate loading={null} persistor={persistor}>
                  <Routes>
                     <Route path='/*' element={<App />} />
                  </Routes>
               </PersistGate>
            </LinkProvider>
         </Provider>
      </BrowserRouter>
   </React.StrictMode>
);

// location /api {
//    proxy_pass http://localhost:8000;
//     proxy_http_version 1.1;
//     proxy_set_header X-Forwarded-Proto $scheme;
//     proxy_set_header Upgrade $http_upgrade;
//     proxy_set_header Connection 'upgrade';
//     proxy_set_header X-Real-IP $remote_addr;
//     proxy_set_header Host $host;
//     proxy_cache_bypass $http_upgrade;
// }
// https://r2byou.com/api/v1/user/mark-notifications
// https://r2byou.com/api/v1/user/mark-notifications
