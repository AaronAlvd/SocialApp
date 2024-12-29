import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Navigation, SocialFeed, Page404, CreatePost, PostDetail, UserProfile, Post } from './components';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './index.css'

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
        path: 'following',
        element: <SocialFeed />,
        children: [
        
        ]
      },
      {
        path: 'groups',
        element: <SocialFeed />,
        children: [

        ]
      },
      {
        path: '*',
        element: <Page404 />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
