import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Navigation, Page404, UserProfile, Post, Chats, GroupPost} from './components';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './index.css'

function Layout() {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth - 201)

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

  return (
    <>
     <Navigation />
     <div style={{transform: 'translateX(201px)', width: `${width}px`}} >
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
        path: 'groups',
        element: <GroupPost />,
        children: [

        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: ':userId',
            element: <UserProfile />
          }
        ]
      },
      {
        path: 'messages',
        element: <Chats />
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
