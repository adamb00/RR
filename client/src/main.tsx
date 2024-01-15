import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: { staleTime: 1 * 60 * 1000 },
   },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
   <ThemeProvider>
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         <App />
      </QueryClientProvider>
   </ThemeProvider>
);
