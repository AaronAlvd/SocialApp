import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 

import "./FollowingModal.css" 

export default function FollowingModal() {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const [width, setWidth] = useState(window.innerWidth); 
  const [height, setHeight] = useState(window.innerHeight); 

  return ( 
    <div className="FollowingModal">
    <div className="FollowingModal-div">
      <h3>Feature Coming Soon...</h3>
    </div>
    </div> 
  ) 
}