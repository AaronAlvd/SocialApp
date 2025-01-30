import './Header.css';

import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

import UserDropdown from '../Dropdown/UserDropdown';
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";


export default function Header() {
  const user = useSelector(state => state.session.user)
  const [userDrop, setUserDrop] = useState(false);
  const [active, setActive] = useState();

  return (
    <div className='Navigation-header_nav'>
      <h2 style={{marginLeft: '10px'}}>The Social App</h2>
      <div className={active ? 'Navigation-div_input01' : 'Navigation-div_input'} >
        <HiMiniMagnifyingGlass style={{transform: 'translate(-5px, 0)'}}/>
        <input type="input" className='Navigation-input' onFocus={() => setActive(true)} onBlur={() => setActive(false)}/>
      </div>
      <div className='Navigation-profile_box'>
        <img src={(user && user.profilePhoto) ? user.profilePhoto : defaultpfp} className="Navigation-profilePhoto" onClick={() => setUserDrop(!userDrop)}/>
        {userDrop && <UserDropdown />}
      </div>
    </div>
  )
}