import DispatchCalls from "../../../StateManagement/dispatch";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import Body from '../Post/body.jsx';
import ExploreModal from "./ExploreModal/ExploreModal.jsx";
import './Explore.css';

export default function Post() {
  const dispatch = useDispatch();
  const dispatchCall = new DispatchCalls(dispatch);
  const posts = useSelector(state => state.posts.posts);
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
    }

    if (!posts) {
      fetch()
    }

  }, []);

  if (!posts) return null;

  if (width < 1040) {
    return (
      <div style={{height: `${height - 49.5}px`, overflow: 'scroll'}}>
        <Body optional={'explore'}/>
      </div>
    )
  }

  return (
    <div style={{height: `${height - 60}px`, overflow: 'scroll'}}>
      <div style={{display: 'grid', gridTemplateColumns: '567px 1fr'}}>
        <Body optional={'explore'}/>
        {width > 1439 && <ExploreModal />}
      </div>
    </div>
  )
}