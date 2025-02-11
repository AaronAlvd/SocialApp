import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 

import "./ExploreModal.css" 

export default function ExploreModal() {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const [width, setWidth] = useState(window.innerWidth); 
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {

  }, [])

  return ( 
    <div className="ExploreModal">
    <div className="ExploreModal-div">
      <div className="ExploreModal-div_top">
      </div>

      <div className="ExploreModal-div_bottom">
      </div>
    </div>
    </div> 
  ) 
}