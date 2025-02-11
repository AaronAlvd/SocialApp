import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaMagnifyingGlass } from "react-icons/fa6";
import DispatchCalls from '../../../../StateManagement/dispatch.jsx';

export default function Header({ type }) {
  const dispatch = useDispatch();
  const dispatchCall = new DispatchCalls(dispatch);
  const [searchVal, setSearchVal] = useState();
  const [showQuery, setShowQuery] = useState(false);
  const [userResults, setUserResults] = useState();
  const [groupResults, setGroupResults] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const response = await dispatchCall.ExploreQuery(query);
      setUserResults(response.users)
      setGroupResults(response.groups)
      setShowQuery(userResults.length > 0 || groupResults.length > 0)
    }
    fetch()
  }, [query])

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

  const displayUserResults = async () => {
    const users = userResults.map((user) => {
      
    })
  }

  return (
    <div className="ExploreHeader-div" style={{width: `${width - 201}px`}}>
      <div className={ active ? 'ExploreHeader-div_input ExpH-act' : 'ExploreHeader-div_input'}>
        <FaMagnifyingGlass style={{margin: '0px 0 0 10px', fontSize: '14'}} onClick={() => handleQuery}/>
        <input type="text" className='ExploreHeader-input' onFocus={() => setActive(true)} onBlur={() => setActive(false)}
               placeholder='Search' value={query} onChange={(e) => setQuery(e.target.value)}/>
      </div>
      {showQuery && displayUserResults()}
    </div>
  )
}