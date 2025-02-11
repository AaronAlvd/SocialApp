import { useEffect, useState, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FollowingModal from './FollowingModal/FollowingModal';
import Body from '../Post/body';

import "./Following.css" 

export default function Following() {
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

  if (width < 1040) {
    return (
      <div style={{height: `${height - 49.5}px`, overflow: 'scroll'}}>
        <Body optional={'following'}/>
      </div>
    )
  }

  return (
    <div style={{height: `${height - 60}px`, overflow: 'scroll'}}>
      <div style={{display: 'grid', gridTemplateColumns: '567px 1fr'}}>
        <Body optional={'following'}/>
        {width > 1439 && <FollowingModal />}
      </div>
    </div>
  )
}