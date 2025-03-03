import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 

import "./Home.css" 

export default function Navigation() {
  const location = useLocation(); 
  const navigate = useNavigate();
  const [active, setActive] = useState();
  const [width, setWidth] = useState(window.innerWidth); 
  const [height, setHeight] = useState(window.innerHeight);

  const activeClass = 'mx-[10px] font-bold'
  const nonActiveClass = 'mx-[10px]'

  useEffect(() => {
    setActive({
      following: /^\/following(\/.*)?$/.test(location.pathname),
      explore: /^\/explore(\/.*)?$/.test(location.pathname),
    });
  }, [location])
  
  if (!active) return null;

  return ( 
    <div className="flex justify-center sticky top-0 bg-white z-1">
      <p className={active.explore ? activeClass : nonActiveClass} onClick={() => navigate("/explore")}>
        Explore
      </p> 
      <p className={active.following ? activeClass : nonActiveClass} onClick={() => navigate("/following")}>
        Following
      </p>
      <p></p>
    </div> 
  ) 
}