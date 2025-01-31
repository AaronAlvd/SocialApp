import { useSelector, useDispatch } from "react-redux";
import DispatchCalls from '../../../StateManagement/dispatch';
import UpdateProfile from "../../Modals/UpdateProfile/Updateprofile";
import { useModal } from '../../../context/modal';
import UserPosts from '../UserPosts';
import Body from '../../Posts/Post/body';
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './UserProfile.css';


export default function UserProfile() {
  const { userId } = useParams();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector(state => state.session.user);
  const [userProfile, setUserProfile] = useState();
  const [userPosts, setUserPosts] = useState();
  const [height, setHeight] = useState(window.innerHeight);

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
      setUserProfile(response);
      setUserPosts(response02);
    }

    fetch()

  }, []);


  if (!userProfile && !userPosts) return null;

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
          {user.id === userProfile.id ? 
          <button className="UserProfile-button" onClick={() => setModalContent(<UpdateProfile />)}>Edit Profile</button> : 
          <button className="UserProfile-button">Follow</button>}
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
            {user.id === userProfile.id ? 
            <button className="UserProfile-button" onClick={() => setModalContent(<UpdateProfile />)}>Edit Profile</button> : 
            <button className="UserProfile-button">Follow</button>}
          </div>
        </div>
      )
    }
    else {
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
          {user.id === userProfile.id ? 
          <button className="UserProfile-button" onClick={() => setModalContent(<UpdateProfile />)}>Edit Profile</button> : 
          <button className="UserProfile-button">Follow</button>}
          </div>
        </div>
      )
    } 
  }

  return (
    <div className='UserProfile-div' style={{height: `${height - 49.5}px`}}>
      {displayHeader()}
      <div>
        <Body optional={userPosts}/>
      </div>
    </div>
  )
}