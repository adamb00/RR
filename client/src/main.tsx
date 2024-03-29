import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { LinkProvider } from './context/LinkContext.tsx';

import { StrictMode } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { store, persistor } from './app/store.ts';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';

import 'drag-drop-touch';

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
               <LinkProvider>
                  <ThemeProvider>
                     <ReactQueryDevtools initialIsOpen={false} />
                     <DndProvider backend={HTML5Backend}>
                        <PersistGate loading={null} persistor={persistor}>
                           <Routes>
                              <Route path='/*' element={<App />} />
                           </Routes>
                        </PersistGate>
                     </DndProvider>
                  </ThemeProvider>
               </LinkProvider>
            </Provider>
         </QueryClientProvider>
      </BrowserRouter>
   </StrictMode>
);
