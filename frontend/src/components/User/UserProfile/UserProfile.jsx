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

  useEffect(() => {

    dispatchCalls.UserProfile(userId)

  }, []);


  if (!userInfo) return null;

  return (
    <div className='UserProfile-div'>
      <div className='UserProfile-section_1'>
        <div className='UserProfile-column_1'>
          <img src={userInfo.profilePhoto ? dispatchCalls.convertImageToBase64(userInfo.profilePhoto) : defaultpfp} 
               className='UserProfile-profilePhoto'/>
        </div>
        <div className="UserProfile-column_2">
          <p className="UserProfile-name">{userInfo.firstName} {userInfo.lastName}</p>
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
    </div>
  )
}