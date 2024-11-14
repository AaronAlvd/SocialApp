import Post from './Post/Post';
import { useEffect, useState, useMemo } from "react";
import PostDetail from './PostDetail/PostDetail';
import './SocialFeed.css'
import { Outlet } from 'react-router-dom';

export default function SocialFeed() {
  const [width, setWidth] = useState(window.innerWidth - 201);
  const url = window.location.pathname;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerHeight - 61); // Update height on window resize
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const loadPage = () => {
    if (url === '/following') {
      return <Post/>
    } else {
      return <PostDetail />
    }
  };

  return (
    <div className='SocialFeed-div' style={{width: width}}>
      {loadPage()}
    </div>
  )
}