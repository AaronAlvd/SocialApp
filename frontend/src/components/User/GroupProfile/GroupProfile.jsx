import { useSelector, useDispatch } from "react-redux";
import DispatchCalls from '../../../StateManagement/dispatch';
import Following from '../Following/Following';
// import UserPosts from "../Posts";
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './GroupProfile.css';


export default function GroupProfile() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const [group, setGroup] = useState();
  const [groupPosts, setGroupPosts] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCalls.GroupProfile(groupId);
      const response02 = await dispatchCalls.GroupPost(groupId);
      setGroup(response);
      setGroupPosts(response02);
    }

    fetch()

  }, []);

  const displayHeader = () => {
    if (width < 768) {
      return (
        <>
        <div className='GroupProfile-section_1'>
        <div className='GroupProfile-column_1'>
          <img src={group.profilePhoto ? group.profilePhoto : defaultpfp} 
               className='GroupProfile-profilePhoto'/>
          <p className="GroupProfile-name">{group.groupName}</p>
        </div>
        <div className="GroupProfile-column_2">
          <p className="GroupProfile-bio">{group.bio}</p>
        </div>
        </div>
        <div className="GroupProfile-section_2">
        <div className="GroupProfile-section_2-column">
          <p className="GroupProfile-info">Posts</p>
          <p className="GroupProfile-stats">{group.posts}</p>
        </div>
        <div className="GroupProfile-section_2-column">
          <p className="GroupProfile-info">Members</p>
          <p className="GroupProfile-stats">{group.Members}</p>
        </div>
        <div className="GroupProfile-section_2-column">
          <p className="GroupProfile-info">Likes</p>
          <p className="GroupProfile-stats">{group.Likes}</p>
        </div>
        </div>
        </>
      )
    } 
    else {
      return (
        <>
        <div className='GroupProfile-section_1'>
          <img src={group.profilePhoto ? group.profilePhoto : defaultpfp}
               className='GroupProfile-profilePhoto'/>

          <div className="GroupProfile-top_left">
            <p className="GroupProfile-name">{group.groupName}</p>
            <div style={{display: 'flex', justifyContent: 'center', margin: '10px 0 0 0'}}>
             <div className="GroupProfile-section_2-column">
               <p className="GroupProfile-info">Posts</p>
               <p className="GroupProfile-stats">{group.Posts}</p>
             </div>
             <div className="GroupProfile-section_2-column">
               <p className="GroupProfile-info">Members</p>
               <p className="GroupProfile-stats">{group.GroupUsers}</p>
             </div>
             <div className="GroupProfile-section_2-column">
               <p className="GroupProfile-info">Likes</p>
               <p className="GroupProfile-stats">{group.Likes}</p>
             </div>
            </div>
          </div>
          <p className="GroupProfile-bio">{group.bio}</p>
        </div>
        </>
      )
    } 
  }

  if (!group && !groupPosts) return null;

  return (
    <div className='GroupProfile-div'>
      {displayHeader()}
      <div >
        {/* <Posts posts={groupPosts}/> */}
      </div>
    </div>
  )
}