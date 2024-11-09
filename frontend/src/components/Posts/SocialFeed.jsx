import Post from './Post/Post';
import { useEffect, useState, useMemo } from "react";
import './SocialFeed.css'
import { Outlet } from 'react-router-dom';

export default function SocialFeed() {
  const [width, setWidth] = useState(window.innerWidth - 201);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerHeight - 61); // Update height on window resize
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='SocialFeed-div' style={{width: width}}>
      <Post />
    </div>
  )
}