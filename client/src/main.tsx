// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import App from './App.tsx';
// import { ThemeProvider } from './context/ThemeContext.tsx';
// import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import { store, persistor } from './app/store.ts';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TestComp from './utils/TestComp.tsx';

// const queryClient = new QueryClient({
//    defaultOptions: {
//       queries: {
//          staleTime: 0,
//          refetchInterval: 0,
//       },
//    },
// });

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <TestComp />
      {/* <BrowserRouter>
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
         </QueryClientProvider>
      </BrowserRouter> */}
   </StrictMode>
);
