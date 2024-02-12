import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

import { StrictMode } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { store, persistor } from './app/store.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'drag-drop-touch';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 0,
         refetchInterval: 0,
      },
   },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <BrowserRouter>
         <ThemeProvider>
            <QueryClientProvider client={queryClient}>
               <ReactQueryDevtools initialIsOpen={false} />
               <DndProvider backend={HTML5Backend}>
                  <Provider store={store}>
                     <PersistGate loading={null} persistor={persistor}>
                        <Routes>
                           <Route path='/*' element={<App />} />
                        </Routes>
                     </PersistGate>
                  </Provider>
               </DndProvider>
            </QueryClientProvider>
         </ThemeProvider>
      </BrowserRouter>
   </StrictMode>
);
