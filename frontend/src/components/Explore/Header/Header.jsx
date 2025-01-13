// External Libraries
import { useState, useEffect } from 'react';

// Assets
import { HiMagnifyingGlass } from "react-icons/hi2";

// Components


// Stylesheets
import './Header.css';





export default function Header() {
  const [query, setQuery] = useState();

  return (
    <div className="ExploreHeader">
      <div className="ExploreHeader-search_bar">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." 
               className="ExploreHeader-search_input"/>
      </div>
      <div className='ExploreHeader-search_icon'>
        <HiMagnifyingGlass style={{color: 'white'}}/>
      </div>
    </div>
  )
}