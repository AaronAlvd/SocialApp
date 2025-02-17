import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 

import "./Home.css" 

export default function Navigation() {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const [width, setWidth] = useState(window.innerWidth); 
  const [height, setHeight] = useState(window.innerHeight); 

  return ( 
    <div className="Home-div_navigation">
      <p className="Home-labels">Explore</p> 
      <p className="Home-labels">Following</p>
      <p></p>
    </div> 
  ) 
}