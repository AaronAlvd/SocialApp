import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Navigation, SocialFeed, Page404, CreatePost, PostLayout } from './components';
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
        path: '/posts',
        element: <PostLayout />,
        children: [
          {
            path: '/posts/following',
            element: <SocialFeed />
          }
        ]
      },
      {
        path: '/following',
        element: <SocialFeed />
      },
      {
        path: '/form',
        element: <CreatePost />
      },
      {
        path: '/:postId',
        element: <h1>Soon...</h1>
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
