import DispatchCalls from "../../../StateManagement/dispatch";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import Body from '../Post/body';
import Header from './Header/Header';
import './Explore.css';

export default function Post() {
  const dispatch = useDispatch();
  const dispatchCall = new DispatchCalls(dispatch);
  const [posts, setPosts] = useState();
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

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCall.Explore();
      setPosts(response);
    }

    if (!posts) {
      fetch()
    }

  }, []);

  if (!posts) return null;

  if (width < 1040) {
    return (
      <div style={{height: `${height - 49.5}px`, overflow: 'scroll'}}>
        <Body optional={posts}/>
      </div>
    )
  }

  return (
    <div style={{height: `${height - 60}px`, overflow: 'scroll'}}>
      <Body optional={posts}/>
    </div>
  )

}