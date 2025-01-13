import { useSelector, useDispatch } from "react-redux";
import DispatchCalls from '../../../StateManagement/dispatch';
import Following from '../Following/Following';
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { useModal } from '../../../context/modal';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './UserProfile.css';


export default function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const { setModalContent, closeModal } = useModal();
  const userInfo = useSelector(state => state.users.profile);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {

    dispatchCalls.UserProfile(userId);

  }, []);


  if (!userInfo) return null;

  const displayHeader = () => {
    if (width < 768) {
      return (
        <>
        <div className='UserProfile-section_1'>
        <div className='UserProfile-column_1'>
          <img src={userInfo.profilePhoto ? dispatchCalls.convertImageToBase64(userInfo.profilePhoto) : defaultpfp} 
               className='UserProfile-profilePhoto'/>
          <p className="UserProfile-name">{userInfo.firstName} {userInfo.lastName}</p>
        </div>
        <div className="UserProfile-column_2">
          <p className="UserProfile-bio">{userInfo.bio}</p>
        </div>
        </div>
        <div className="UserProfile-section_2">
        <div className="UserProfile-section_2-column">
          <p className="UserProfile-info">Posts</p>
          <p className="UserProfile-stats">{userInfo.posts}</p>
        </div>
        <div className="UserProfile-section_2-column">
          <p className="UserProfile-info">Followers</p>
          <p className="UserProfile-stats">{userInfo.followers}</p>
        </div>
        <div className="UserProfile-section_2-column">
          <p className="UserProfile-info">Following</p>
          <p className="UserProfile-stats">{userInfo.following}</p>
        </div>
        <div className="UserProfile-section_2-column">
          <p className="UserProfile-info">Likes</p>
          <p className="UserProfile-stats">{userInfo.likes}</p>
        </div>
        </div>
        </>
      )
    } 
    else {
      return (
        <>
        <div className='UserProfile-section_1'>
          <img src={userInfo.profilePhoto ? dispatchCalls.convertImageToBase64(userInfo.profilePhoto) : defaultpfp}
               className='UserProfile-profilePhoto'/>

          <div className="UserProfile-top_left">
            <p className="UserProfile-name">{userInfo.firstName} {userInfo.lastName}</p>
            <div style={{display: 'flex', justifyContent: 'center', margin: '10px 0 0 0'}}>
             <div className="UserProfile-section_2-column">
               <p className="UserProfile-info">Posts</p>
               <p className="UserProfile-stats">{userInfo.posts}</p>
             </div>
             <div className="UserProfile-section_2-column">
               <p className="UserProfile-info">Followers</p>
               <p className="UserProfile-stats">{userInfo.followers}</p>
             </div>
             <div className="UserProfile-section_2-column">
               <p className="UserProfile-info">Following</p>
               <p className="UserProfile-stats">{userInfo.following}</p>
             </div>
             <div className="UserProfile-section_2-column">
               <p className="UserProfile-info">Likes</p>
               <p className="UserProfile-stats">{userInfo.likes}</p>
             </div>
            </div>
          </div>
          <p className="UserProfile-bio">{userInfo.bio}</p>
        </div>
        </>
      )
    } 
  }

  return (
    <div className='UserProfile-div'>
      {displayHeader()}
    </div>
  )
}