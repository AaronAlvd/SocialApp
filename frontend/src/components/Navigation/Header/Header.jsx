import './Header.css';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserDropdown from '../Dropdown/UserDropdown.jsx';
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import DispatchCalls from '../../../StateManagement/dispatch.jsx';


export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchCalls = new DispatchCalls(dispatch);
  const user = useSelector(state => state.session.user);
  const [userDrop, setUserDrop] = useState(false);
  const [search, setSearch] = useState('');
  const users = useSelector(state => state.users.users);
  const [active, setActive] = useState(false);

  useEffect(() => {

    if (search.length > 0) return handleSearch;

    const handleEnter = (e) => {
      if (e.key === 'Enter' && active) {
        handleSearch()
      }
    }

    window.addEventListener('keydown', handleEnter)

    return () => {
      window.removeEventListener('keydown', handleEnter)
    }
  }, [search, active]);

  const handleSearch = async () => {
    const response = await dispatchCalls.ExploreQuery(search);
  };

  const displayResults = () => {
    if (!users) {
      return (
      <div>
        <p>No Results</p>
      </div>
      )
    }

    return users.map((data) => {
      return (
        <div className='NavigationHeader-div_resultsBox' onClick={() => navigate(`/profile/user/${data.username}`)}>
          <img src={data.profilePhoto} className='NavigationHeader-profilePhoto'/>
          <div>
            <p className='NavigationHeader-name'>{data.firstName} {data.lastName}</p>
            <p className='NavigationHeader-username'>@{data.username}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='Navigation-header_nav'>
      <h2 style={{marginLeft: '10px'}}>The Social App</h2>
      <div className={active ? 'Navigation-div_input01' : 'Navigation-div_input'}>
        <HiMiniMagnifyingGlass style={{transform: 'translate(-5px, 0)'}} onClick={() => handleSearch()}/>
        <input type="input" className='Navigation-input' onFocus={() => setActive(true)} onBlur={() => setActive(false)}
               value={search} onChange={(e) => setSearch(e.target.value)}/>
        {search.length > 0 && 
        <div className='Navigation-div_results'>
          {displayResults()}
        </div>}
      </div>
      <div className='Navigation-profile_box'>
        <img src={(user && user.profilePhoto) ? user.profilePhoto : defaultpfp} className="Navigation-profilePhoto" onClick={() => setUserDrop(!userDrop)}/>
        {userDrop && <UserDropdown />}
      </div>
    </div>
  )
}