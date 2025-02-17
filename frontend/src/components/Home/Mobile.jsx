import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 
import { motion } from "framer-motion";

import Construction from "../Construction";

import Navigation from "./Navigation";


import "./Home.css" 

export default function Mobile() {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const [width, setWidth] = useState(window.innerWidth); 
  const [height, setHeight] = useState(window.innerHeight); 

  return ( 
    <div>
      <Navigation /> 
      <Construction height={height - 90}/>
    </div> 
  ) 
}