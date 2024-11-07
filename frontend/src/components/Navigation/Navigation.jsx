import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { UserDropdown } from './Dropdown'
import './Navigation.css'

function Navigation() {
  const [userDrop, setUserDrop] = useState(false);
  const sideBarheight = window.innerHeight - 61;

  return(
    <>
      <div className='Navigation-div-topBar'>
        <div className='div-leftNav'></div>
        <div className='div-rightNav'>
          <FontAwesomeIcon icon={faUserCircle} id="faUser" onClick={() => setUserDrop(!userDrop)}/>
          {userDrop && <UserDropdown />}
        </div>
      </div>
      <div className="Navigation-div-sideBar" style={{ height: `${sideBarheight}px` }}></div>
    </>
  )
}

export default Navigation;