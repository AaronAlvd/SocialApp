import { useEffect, useState, useRef, useMemo } from "react";


import "./DisplayMessage.css" 

export default function DisplayMessage({ message }) {
 

  return ( 
    <div className="DisplayMessage">
      <p>{message}</p> 
    </div> 
  ) 
}