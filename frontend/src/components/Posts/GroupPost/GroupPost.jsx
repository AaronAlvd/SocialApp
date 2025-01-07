import DispatchCalls from "../../../SocialClass/dispatch";
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { Comments } from '../../Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart02 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './GroupPost.css';

export default function GroupPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const dispatchCall = new DispatchCalls(dispatch);
  const unsortedFeed = useSelector((state) => state.posts.groupPosts);
  const sortedFeed = dispatchCall.sortByDate(unsortedFeed);
  const [height, setHeight] = useState(window.innerHeight - 61);
  const [reload, setReload] = useState(false);
  const [showComments, setShowComments] = useState();

  useEffect(() => {
    dispatchCall.socialFeedGroups();
  }, [reload]);

  const handleLike = (postId) => {
    const data = {
      postId: postId,
      commentId: '',
    }
    dispatchCall.handleLike(data);
    setReload(!reload);
  };

  const handleDislike = (postId) => {
    const data = {
      postId: postId,
      commentId: '',
    }
    dispatchCall.handleDislike(data);
    setReload(!reload);
  }

  const heartColor = (data) => {
    let activeLike = false;
    if (data.Likes && data.Likes.length > 0) {
      activeLike = data.Likes.find(obj => obj.userId === user.id);
    }
    return activeLike ? <FontAwesomeIcon icon={faHeart02} className="GroupPost-icon" onClick={() => handleDislike(data.id)} /> : <FontAwesomeIcon icon={faHeart} className="GroupPost-icon" onClick={() => handleLike(data.id)}/>
  }

  if (!sortedFeed) return null;

  return (
    <div className="GroupPost-div">
      {sortedFeed.map((data) => {
        return (
          <div className="GroupPost-div-box">
            <div style={{display: 'flex'}}>
              <img src={data.Group.profilePhoto ? dispatchCall.convertImageToBase64(data.Group.profilePhoto) : defaultpfp} 
                   className="GroupPost-img-profile" onClick={() => navigate(`/groups/${data.Group.groupName}`)}/>
              <div>
                <p className="GroupPost-name" onClick={() => navigate(`/groups/${data.Group.groupName}`)}>{data.Group.groupName}</p>
                <p className="GroupPost-username" onClick={() => navigate(`/profile/${data.User.username}`)}>@{data.User.username}</p>
              </div>
            </div>
            <p className="GroupPost-caption">{dispatchCall.findHashtags(data.caption)}</p>
            {data.photo && <img className="GroupPost-image" src={dispatchCall.convertImageToBase64(data.photo)}/>}
            <p className="GroupPost-bottom">
              <div style={{display: 'flex'}}>
                <div className="GroupPost-div-icon">
                  {heartColor(data)}
                  <small style={{margin: '0 5px 0 10px'}}>{data.Likes.length}</small>
                </div>
                <div className="GroupPost-div-icon" onClick={() => setShowComments(data.id)} style={{cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faComment} className="GroupPost-icon" />
                  <small style={{margin: '0 5px 0 10px'}}>{data.Comments.length}</small>
                </div>
              </div>
            <small>{new Date(data.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></p>
            {(showComments === data.id) && <div style={{width: '65vw'}}><Comments data={data.Comments} user_id={data.userId} postId={data.id}/></div>}
          </div>
        )
      })}
    </div>
  )
}