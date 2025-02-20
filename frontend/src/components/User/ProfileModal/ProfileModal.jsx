import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate, useParams } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 
import { useModal } from '../../../context/modal.jsx';

import DispatchCalls from '../../../StateManagement/dispatch.jsx';

import "./ProfileModal.css" 

export default function ProfileModal() {
  const location = useLocation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector(state => state.session.user);
  const username = params.userId || user.id;
  const dispatchCall = new DispatchCalls(dispatch);
  const { setModalContent } = useModal();
  const userProfile = useSelector(state => state.users.profile);
  const [activeFollower, setActiveFollower] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch () {
      const response = await dispatchCall.following();
      const response02 = await dispatchCall.UserProfile(username);

      for (let item of response) {
        if (item.followingId === userProfile.id) {
          setActiveFollower(true);
          break;
        }
      }

      setLoading(false);
    }

    fetch()
  }, [activeFollower]);

  const handleFollowRequest = async () => {
    const response = await dispatchCall.FollowRequest(userProfile.id);
    if (response.title === 'Successful') {
      setActiveFollower(true);
    }
  };

  const handleUnfollowRequest = async () => {
    const response = await dispatchCall.UnfollowRequest(userProfile.id);
    if (response.title === 'Successful') {
      setActiveFollower(false);
    }
  };

  const displayButton = () => {
    if (user.id === userProfile.id) {
      return (
        <button className="ProfileModal-button1" onClick={() => setModalContent(<UpdateProfile />)}>
          Edit Profile
        </button>
      )
    } else if (activeFollower) {
      return (
      <button className="ProfileModal-button2" onClick={() => handleUnfollowRequest()}>
        Following
      </button>)
    } else {
      return (
      <button className="ProfileModal-button1" onClick={() => handleFollowRequest()}>
        Follow
      </button>
      )
    }
  };

  if (!userProfile && loading) return null;

  return ( 
    <div className="ProfileModal">
    <div className="ProfileModal-div">
      <div className="ProfileModal-row1">
        <p className="ProfileModal-name">{userProfile.firstName} {userProfile.lastName}</p>
      </div>
      <div className="ProfileModal-row2">
        <div className="ProfileModal-div_stats">
          <p className="ProfileModal-stats">{userProfile.following}</p>
          <p className="ProfileModal-stats_label">Following</p>
        </div>
        <div className="ProfileModal-div_stats">
          <p className="ProfileModal-stats">{userProfile.followers}</p>
          <p className="ProfileModal-stats_label">Followers</p>
        </div>
        <div className="ProfileModal-div_stats">
          <p className="ProfileModal-stats">{userProfile.likes}</p>
          <p className="ProfileModal-stats_label">Likes</p>
        </div>
        
        <div className="ProfileModal-div_stats">
          <p className="ProfileModal-stats">{userProfile.posts}</p>
          <p className="ProfileModal-stats_label">Posts</p>
        </div>
      </div>
      <div className="ProfileModal-div_button">
        {displayButton()}
      </div>
    </div> 
    </div> 
  ) 
}