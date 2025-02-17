import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 

import "./Profile.css" 

export default function Profile() {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const [width, setWidth] = useState(window.innerWidth); 
  const [height, setHeight] = useState(window.innerHeight); 

  return ( 
    <div>
      <h1>Profile</h1> 
    </div> 
  ) 
}