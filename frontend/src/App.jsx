import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Navigation, Page404, UserProfile, Following, Chats, Explore, Chat, Trending, Profile, Events, Home, Inbox } from './components';
import { useState, useEffect } from 'react';
import * as sessionActions from './store/session.js';
import { useDispatch } from 'react-redux';
import './index.css'

function Layout() {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

  useEffect(() => {
    // Define the resize handler
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    // Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  if (width < 1040) return (
    <>
     <div style={{minHeight: `${height - 60}px`, boxSizing: 'border-box'}}>
      <Outlet/>
    </div>
     <Navigation />
    </>
  )

  return (
    <>
     <Navigation />
     <div className='Navigation-index' style={{width: `${width - 201}px`}}>
      <Outlet/>
     </div>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'explore',
        children: [
          {
            path: '',
            element: <Explore />,
          },
          {
            path: ':postId',
            element: <Explore />,
          }
        ]
      },
      {
        path: 'inbox',
        element: <Inbox />
      },
      {
        path: 'following',
        element: <Following />,
        children: [
          {
            path: ':postId',
            element: <Following />
          },
        ]
      },
      {
        path: 'events',
        element: <Events />
      },
      {
        path: 'user',
        children: [
          {
            path: ':userId',
            children: [
              {
                path: '',
                element: <UserProfile />
              },
              {
                path: ':postId',
                element: <UserProfile />
              }
            ]
          },
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Profile />
          },
          {
            path: ':userId',
            element: <UserProfile />,
            children: [
              {
                path: ':postId',
                element: <UserProfile />
              }
            ]
          },
        ]
      },
      {
        path: 'messages',
        children: [
          {
            path: '',
            element: <Chats />
          }
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
