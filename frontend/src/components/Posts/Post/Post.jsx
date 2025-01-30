import Body from './body';
import Header from './header';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { default as Header2 }from '../Explore/Header/Header';

export default function Post() {
  const user = useSelector((state) => state.session.user)
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

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

  if (!user) return null

  return (
    <div style={{height: `${height - 49.5}px`, overflow: 'scroll'}}>
    <Body />
    </div>
  )
}