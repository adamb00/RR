import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import AppLayout from './ui/AppLayout';
import Home from './features/Home/Home';
import About from './features/About/About';
import SignIn from './features/Auth/SignIn';
import SignUp from './features/Auth/SignUp';
import Links from './features/Links/Links';

const router = createBrowserRouter([
   {
      element: <AppLayout />,
      children: [
         {
            path: '/',
            element: <Home />,
         },
         {
            path: '/about',
            element: <About />,
         },
         { path: '/signin', element: <SignIn /> },
         { path: '/signup', element: <SignUp /> },
         { path: '/my-links', element: <Links /> },
      ],
   },
]);
export default function App() {
   return <RouterProvider router={router} />;
}
