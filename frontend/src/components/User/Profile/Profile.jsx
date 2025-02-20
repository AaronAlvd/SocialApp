import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 

import Mobile from './Mobile'
import Desktop from "./Desktop";

export default function Profile() {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const user = useSelector(state => state.session.user)
  const [width, setWidth] = useState(window.innerWidth); 
  const [height, setHeight] = useState(window.innerHeight); 

  if (!user) return null;

  if (width < 1040) return <Mobile user={user}/>

  if (width > 1039) return <Desktop user={user}/>
}