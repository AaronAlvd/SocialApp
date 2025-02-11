import { useSelector, useDispatch } from "react-redux";
import { useModal } from '../../../context/modal.jsx';
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './UserProfile.css';

export default function DesktopProfile() {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userProfile = useSelector(state => state.users.profile);

  const handleProfile = () => {
    if (user.id === 'fffbd13b-428a-4d50-a03e-2f65c1f20b0a') {
      return alert('This feature has been disabled for the demo account')
    } else {
      return setModalContent(<EditProfile />)
    }
  }

  return (
    <div className="UserProfile-header">
      <div className="UserProfile-background_photo">

      </div>
      <img src={userProfile.profilePhoto ? userProfile.profilePhoto : defaultpfp} className="UserProfile-photo"/>
      <div className="UserProfile-row2">
        <div></div>
        <div>
          <p className="UserProfile-username">@{userProfile.username.toLowerCase()}</p>
        </div>
      </div>
    </div>
  )
}