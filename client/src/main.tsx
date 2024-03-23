import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { LinkProvider } from './context/LinkContext.tsx';

import { StrictMode } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { store, persistor } from './app/store.ts';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import 'drag-drop-touch';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
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
      <HashRouter>
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
      </HashRou>
   </StrictMode>
);
