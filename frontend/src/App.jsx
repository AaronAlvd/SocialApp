import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Navigation } from './components';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

  return (
    <>
     <Navigation isLoaded={isLoaded} />
     {isLoaded && <Outlet />}
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [

    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
