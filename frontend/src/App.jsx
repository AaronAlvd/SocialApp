import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Navigation, Page404, UserProfile, Post, Chats, GroupPost, GroupProfile, Explore, Chat, Trending} from './components';
import { useState, useEffect } from 'react';
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
  }, []);

  if (width < 1040) return (
    <>
     <Outlet/>
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
        path: '',
        element: <Explore />,
        children: [
          {
            path: ':postId',
            element: <Explore />,
          }
        ]
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
        path: 'following',
        element: <Post />,
        children: [
          {
            path: ':postId',
            element: <Post />
          },
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: 'user/:userId',
            element: <UserProfile />
          },
          {
            path: 'group/:groupId',
            element: <GroupProfile />
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
