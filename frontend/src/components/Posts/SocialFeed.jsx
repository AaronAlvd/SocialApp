import Post from './Post/Post';
import GroupPost from './GroupPost/GroupPost';
import { useEffect, useState, useMemo } from "react";
import Stories from '../Stories/Stories';
import Ads from '../Ads/Ads';
import './SocialFeed.css'
import { Outlet } from 'react-router-dom';

export default function SocialFeed() {
  const [width, setWidth] = useState(window.innerWidth - 201);
  const url = window.location.pathname;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - 61); // Update height on window resize
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const loadPage = () => {
    if (url === '/following') {
      return <Post/>
    } 
    else if (url === '/groups') {
      return <GroupPost />
    }
  };

  return (
    <div className='SocialFeed-div' style={{width: width}}>
      {loadPage()}
      <Ads/>
      <Stories />
    </div>
  )
}