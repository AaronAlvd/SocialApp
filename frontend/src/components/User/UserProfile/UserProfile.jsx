import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../../context/modal.jsx';


import DispatchCalls from '../../../StateManagement/dispatch.jsx';
import defaultpfp from '../../../assets/Default_pfp.jpg';
import Body from '../../Posts/Post/body.jsx';
import DesktopProfile from "./DesktopProfile.jsx";
import UpdateProfile from "../../Modals/UpdateProfile/UpdateProfile.jsx";
import ProfileModal from "../ProfileModal/ProfileModal.jsx";

import './UserProfile.css';


export default function UserProfile() {
  const { userId } = useParams();
  const { setModalContent } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector(state => state.session.user);
  const userProfile = useSelector(state => state.users.profile);
  const [userPosts, setUserPosts] = useState();
  const [height, setHeight] = useState(window.innerHeight);
  const [activeFollower, setActiveFollower] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCalls.UserProfile(userId);
      const response02 = await dispatchCalls.UserPost(userId);
      const response03 = await dispatchCalls.following();

      for (let item of response03) {
        if (item.followingId === response.id) {
          setActiveFollower(true);
          break
        }
      }

      setUserPosts(response02);
      setLoading(false);
    }

    fetch()

  }, [activeFollower]);

  const handleFollowRequest = async () => {
    if (user.id === 'fffbd13b-428a-4d50-a03e-2f65c1f20b0a' && process.env.NODE_ENV === 'production') {
      alert('CREATE, UPDATE, and DELETE features have been disabled for the demo account.')
    }
    const response = await dispatchCalls.FollowRequest(userProfile.id);
    if (response.title === 'Successful') {
      setActiveFollower(true);
    }
  };

  const handleUnfollowRequest = async () => {
    if (user.id === 'fffbd13b-428a-4d50-a03e-2f65c1f20b0a' && process.env.NODE_ENV === 'production') {
      alert('CREATE, UPDATE, and DELETE features have been disabled for the demo account.')
    }
    const response = await dispatchCalls.UnfollowRequest(userProfile.id);
    if (response.title === 'Successful') {
      setActiveFollower(false);
    }
  };

  if (!userProfile || loading) return null;

  const handleEditProfile = () => {
    if (user.id === 'fffbd13b-428a-4d50-a03e-2f65c1f20b0a' && process.env.NODE_ENV === 'production') {
      alert('CREATE, UPDATE, and DELETE features have been disabled for the demo account.')
    }
  }

  const displayButton = () => {
    if (userProfile.id === user.id) {
      return(
      <button className="UserProfile-button" onClick={() => handleEditProfile()}>
        Edit Profile
      </button>)
    } else if (userProfile.followStatus === 'following') {
      return(
        <>
        <button className="UserProfile-button2" onClick={() => handleUnfollowRequest()}>
          Following
        </button>
        <button className="UserProfile-button2" onClick={() => navigate(`/messages/${userProfile.username}`)}>
          Message
        </button>
        </>)
    } else if (userProfile.followStatus === 'pending') {
      return (
        <button className="UserProfile-button2" onClick={() => handleUnfollowRequest()}>
          Pending
        </button>)
    } else if (userProfile.followStatus === 'none'){
      return(
      <>
        <button className="UserProfile-button" onClick={() => handleFollowRequest()}>
          Follow
        </button>
        <button className="UserProfile-button2" onClick={() => navigate(`/messages/${userProfile.username}`)}>
          Message
        </button>
      </>)
    }
  }

  const handleProfile = () => {
    if (user.id === 'fffbd13b-428a-4d50-a03e-2f65c1f20b0a' && process.env.NODE_ENV === 'production') {
      alert('CREATE, UPDATE, and DELETE features have been disabled for the demo account.')
    } else {
      return setModalContent(<EditProfile />)
    }
  }

  const displayHeader = () => {
    if (width < 1040 && width > 480) {
      return (
        <div className="UserProfile-header">
          <div className="UserProfile-row1">
            <div className="UserProfile-div_photo">
              <img src={userProfile.profilePhoto ? userProfile.profilePhoto : defaultpfp} className="UserProfile-photo"/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <p>@{userProfile.username}</p>
              <div className="UserProfile-row1_column2">
                <div className="UserProfile-div_stats">
                  <p className="UserProfile-stats">{userProfile.followers}</p>
                  <p className="UserProfile-stats_label">Followers</p>
                </div>
                <div className="UserProfile-div_stats">
                  <p className="UserProfile-stats">{userProfile.following}</p>
                  <p className="UserProfile-stats_label">Following</p>
                </div>
                <div className="UserProfile-div_stats">
                  <p className="UserProfile-stats">{userProfile.likes}</p>
                  <p className="UserProfile-stats_label">Likes</p>
                </div>
                <div className="UserProfile-div_stats">
                  <p className="UserProfile-stats">{userProfile.posts}</p>
                  <p className="UserProfile-stats_label">Posts</p>
                </div>
              </div>
            </div>
          </div>
          <div className="UserProfile-div_bio">
            <p className="UserProfile-bio">{userProfile.bio}</p>
          </div>
          <div className="UserProfile-div_button">
          {displayButton()}
          </div>
        </div>
      )
    } 
    else if (width < 481) {
      return (
        <div className="UserProfile-header">
          <div className="UserProfile-row1">
            <div className="UserProfile-div_photo">
              <img src={userProfile.profilePhoto ? userProfile.profilePhoto : defaultpfp} className="UserProfile-photo"/>
            </div>
            <div className="UserProfile-row1_column2">
              <div className="UserProfile-div_stats">
                <p className="UserProfile-stats">{userProfile.posts}</p>
                <p className="UserProfile-stats_label">Posts</p>
              </div>
              <div className="UserProfile-div_stats">
                <p className="UserProfile-stats">{userProfile.followers}</p>
                <p className="UserProfile-stats_label">Followers</p>
              </div>
              <div className="UserProfile-div_stats">
                <p className="UserProfile-stats">{userProfile.following}</p>
                <p className="UserProfile-stats_label">Following</p>
              </div>
            </div>
          </div>
          <div className="UserProfile-div_bio">
            <p className="UserProfile-bio">{userProfile.bio}</p>
          </div>
          <div className="UserProfile-div_button">
            {displayButton()}
          </div>
        </div>
      )
    } else if (width > 1439) {
      return <DesktopProfile/>
    } else {
      return (
        <div className="UserProfile-header">
          <div className="UserProfile-row1">
            <div className="UserProfile-div_photo">
              <img src={userProfile.profilePhoto ? userProfile.profilePhoto : defaultpfp} className="UserProfile-photo"/>
              <p className="UserProfile-username">@{userProfile.username.toLowerCase()}</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div className="UserProfile-row1_column2">
                <div className="UserProfile-div_stats">
                  <p className="UserProfile-stats">{userProfile.followers}</p>
                  <p className="UserProfile-stats_label">Followers</p>
                </div>
                <div className="UserProfile-div_stats">
                  <p className="UserProfile-stats">{userProfile.following}</p>
                  <p className="UserProfile-stats_label">Following</p>
                </div>
                <div className="UserProfile-div_stats">
                  <p className="UserProfile-stats">{userProfile.likes}</p>
                  <p className="UserProfile-stats_label">Likes</p>
                </div>
                <div className="UserProfile-div_stats">
                  <p className="UserProfile-stats">{userProfile.posts}</p>
                  <p className="UserProfile-stats_label">Posts</p>
                </div>
              </div>
            </div>
          </div>
          <div className="UserProfile-div_bio">
            <p className="UserProfile-bio">{userProfile.bio}</p>
          </div>
          <div className="UserProfile-div_button">
          {displayButton()}
          </div>
        </div>
      )
    } 
  }

  return (
    <div className='UserProfile-div' style={{height: `${height - 49.5}px`}}>
      {displayHeader()}
      <div className="UserProfile-inner_div">
        <Body optional={'profile'}/>
        {width > 1439 && <ProfileModal />}
      </div>
    </div>
  )
}