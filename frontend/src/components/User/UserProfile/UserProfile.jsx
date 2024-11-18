import { useSelector, useDispatch } from "react-redux";
import DispatchCalls from '../../../SocialClass/dispatch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import Social from '../../../SocialClass/social';
import { useParams } from 'react-router-dom';
import './UserProfile.css';


export default function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const social = new Social();
  const userInfo = useSelector(state => state.userProfile.userProfile);
  const [height, setHeight] = useState(window.innerHeight - 61);
  const [width, setWidth] = useState(window.innerWidth - 201);
  const [reload, setReload] = useState(true);

  useEffect(() => {

    const handleResize = () => {
      setHeight(window.innerHeight - 61);
      setWidth(window.innerWidth - 201);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, reload]);

  useEffect(() => {
    dispatchCalls.UserProfile(userId);
  }, [dispatch]);

  if (!userInfo) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className='UserProfile-div' style={{width: `${width}px`, height: `${height}px`}}>
      {userInfo.profilePhoto ? <img src={`${social.convertImageToBase64(userInfo.profilePhoto)}`} className="UserProfile-img"/> : <FontAwesomeIcon icon={faUserCircle}/>}
      <p className="UserProfile-bio">{userInfo.bio}</p>
    </div>
  )
}