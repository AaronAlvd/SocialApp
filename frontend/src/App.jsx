import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Navigation }from './components';

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
