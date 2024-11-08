import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from './SideBar/SideBar';
import { UserDropdown } from './Dropdown'
import './Navigation.css'

function Navigation() {
  const navigate = useNavigate();
  const [userDrop, setUserDrop] = useState(false);
  const [height, setHeight] = useState(window.innerHeight - 61);
  const user = useSelector(state => state.session.user);
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 61); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return(
    <>
      <div className='Navigation-div-topBar'>
        <div className='div-leftNav'></div>
        <div className='div-rightNav'>
          <FontAwesomeIcon icon={faUserCircle} id="faUser" onClick={() => setUserDrop(!userDrop)}/>
          {userDrop && <UserDropdown />}
        </div>
      </div>
      <div className="Navigation-div-sideBar" style={{ height: `${height}px` }}>
        <SideBar />
      </div>
      {user && <div className='Navigation-newPost' onClick={() => navigate('/createpost')}>+</div>}
    </>
  )
}

export default Navigation;