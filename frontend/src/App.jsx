import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Navigation, SocialFeed } from './components';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

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
    element: <Layout />,
    children: [
      {
        path: '/socialfeed',
        element: <SocialFeed />
      },
      {
        path: '*',
        element: <h1>404 Page Not Found</h1>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
