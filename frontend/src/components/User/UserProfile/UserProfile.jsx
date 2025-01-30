import { useSelector, useDispatch } from "react-redux";
import DispatchCalls from '../../../StateManagement/dispatch';
import UserPosts from '../UserPosts';
import Body from '../../Posts/Post/body';
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { useModal } from '../../../context/modal';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './UserProfile.css';


export default function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const [width, setWidth] = useState(window.innerWidth);
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState();

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCalls.UserProfile(userId);
      const response02 = await dispatchCalls.UserPost(userId);
      setUser(response);
      setUserPosts(response02);
    }

    fetch()

  }, []);


  if (!user && !userPosts) return null;

  const displayHeader = () => {
    if (width < 768) {
      return (
        <>
        <div className='UserProfile-section_1'>
        <div className='UserProfile-column_1'>
          <img src={user.profilePhoto ? user.profilePhoto : defaultpfp} 
               className='UserProfile-profilePhoto'/>
          <p className="UserProfile-name">{user.firstName} {user.lastName}</p>
        </div>
        <div className="UserProfile-column_2">
          <p className="UserProfile-bio">{user.bio}</p>
        </div>
        </div>
        <div className="UserProfile-section_2">
        <div className="UserProfile-section_2-column">
          <p className="UserProfile-info">Posts</p>
          <p className="UserProfile-stats">{user.posts}</p>
        </div>
        <div className="UserProfile-section_2-column">
          <p className="UserProfile-info">Followers</p>
          <p className="UserProfile-stats">{user.followers}</p>
        </div>
        <div className="UserProfile-section_2-column">
          <p className="UserProfile-info">Following</p>
          <p className="UserProfile-stats">{user.following}</p>
        </div>
        <div className="UserProfile-section_2-column">
          <p className="UserProfile-info">Likes</p>
          <p className="UserProfile-stats">{user.likes}</p>
        </div>
        </div>
        </>
      )
    } 
    else {
      return (
        <>
        <div className='UserProfile-section_1'>
          <img src={user.profilePhoto ? user.profilePhoto : defaultpfp}
               className='UserProfile-profilePhoto'/>

          <div className="UserProfile-top_left">
            <p className="UserProfile-name">{user.firstName} {user.lastName}</p>
            <div style={{display: 'flex', justifyContent: 'center', margin: '10px 0 0 0'}}>
             <div className="UserProfile-section_2-column">
               <p className="UserProfile-info">Posts</p>
               <p className="UserProfile-stats">{user.posts}</p>
             </div>
             <div className="UserProfile-section_2-column">
               <p className="UserProfile-info">Followers</p>
               <p className="UserProfile-stats">{user.followers}</p>
             </div>
             <div className="UserProfile-section_2-column">
               <p className="UserProfile-info">Following</p>
               <p className="UserProfile-stats">{user.following}</p>
             </div>
             <div className="UserProfile-section_2-column">
               <p className="UserProfile-info">Likes</p>
               <p className="UserProfile-stats">{user.likes}</p>
             </div>
            </div>
          </div>
          <p className="UserProfile-bio">{user.bio}</p>
        </div>
        </>
      )
    } 
  }

  return (
    <div className='UserProfile-div'>
      {displayHeader()}
      <div>
        <Body optional={userPosts}/>
      </div>
    </div>
  )
}