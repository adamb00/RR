import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { store, persistor } from './app/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';

import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 0,
         refetchInterval: 0,
      },
   },
});

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <Provider store={store}>
               <ThemeProvider>
                  <ReactQueryDevtools initialIsOpen={false} />
                  <PersistGate loading={null} persistor={persistor}>
                     <Routes>
                        <Route path='/*' element={<App />} />
                     </Routes>
                  </PersistGate>
               </ThemeProvider>
            </Provider>
            <Toaster
               position='top-center'
               gutter={12}
               containerStyle={{
                  margin: '8px',
               }}
               toastOptions={{
                  success: {
                     duration: 5000,
                     style: { color: '#55c57a' },
                  },
                  error: {
                     duration: 5000,
                     style: { color: '#ed4245' },
                  },
                  style: {
                     fontSize: '16px',
                     maxWidth: '500px',
                     padding: '16px 24px',
                     backgroundColor: '#f7f7f7',
                  },
               }}
            />
         </QueryClientProvider>
      </BrowserRouter>
   </StrictMode>
);
