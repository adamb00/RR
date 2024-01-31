import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { StrictMode } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import 'drag-drop-touch';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 1000,
         refetchInterval: 1000,
      },
   },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider>
         <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <DndProvider backend={HTML5Backend}>
               <AuthProvider>
                  <App />
               </AuthProvider>
            </DndProvider>
         </QueryClientProvider>
      </ThemeProvider>
   </StrictMode>
);
