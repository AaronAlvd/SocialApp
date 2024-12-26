import DispatchCalls from "../../../SocialClass/dispatch";
import Social from "../../../SocialClass/social";
import { Comments } from '../../Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart02 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Post.css';

export default function Post() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const social = new Social();
  const dispatchCall = new DispatchCalls(dispatch);
  const unsortedFeed = useSelector((state) => state.posts.posts);
  const sortedFeed = social.sortByDate(unsortedFeed);
  const [height, setHeight] = useState(window.innerHeight - 61);
  const [reload, setReload] = useState(true);
  const [showComments, setShowComments] = useState();
  const navigate = useNavigate();

  useEffect(() => {

    dispatchCall.socialFeed();
    dispatchCall.UserProfile();
    
    const handleResize = () => {
      setHeight(window.innerHeight - 61);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatchCall, reload]);

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
    return activeLike ? <FontAwesomeIcon icon={faHeart02} className="Post-icon" onClick={() => handleDislike(data.id)} /> : <FontAwesomeIcon icon={faHeart} className="Post-icon" onClick={() => handleLike(data.id)}/>
  }

  return (
    <div className="Post-div" style={{height: height}}>
      {sortedFeed.map((data) => {
        return (
          <div className="Post-div-box">
            <div style={{display: 'flex'}}>
              {data.User.profilePhoto ? <img src={social.convertImageToBase64(data.User.profilePhoto)} className="Post-img-profile" /> : <faUserCircle/>}
              <div>
                <p className="Post-name">{data.User.firstName} {data.User.lastName}</p>
                <p className="Post-username">@{data.User.username}</p>
              </div>
            </div>
            <p className="Post-caption">{social.findHashtags(data.caption)}</p>
            {data.photo && <img className="Post-image" src={social.convertImageToBase64(data.photo)}/>}
            <p className="Post-bottom">
              <div style={{display: 'flex'}}>
                <div className="Post-div-icon">
                  {heartColor(data)}
                  <small style={{margin: '0 5px 0 10px'}}>{data.Likes.length}</small>
                </div>
                <div className="Post-div-icon" onClick={() => setShowComments(showComments === data.id ? '' : data.id)} style={{cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faComment} className="Post-icon" />
                  <small style={{margin: '0 5px 0 10px'}}>{data.Comments.length}</small>
                </div>
              </div>
            <small>{new Date(data.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></p>
            {(showComments === data.id) && <div style={{width: '65vw'}}><Comments data={data.Comments}/></div>}
          </div>
        )
      })}
    </div>
  )
}