import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/styles/main.scss';
import { store, persistor } from './app/store.ts';
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
