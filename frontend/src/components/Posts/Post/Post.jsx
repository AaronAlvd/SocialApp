import DispatchCalls from "../../../SocialClass/dispatch";
import Social from "../../../SocialClass/social";
import Comments from '../Comments/Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart02 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Post.css';

export default function Post() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const unsortedFeed = useSelector((state) => state.posts.posts);
  const social = new Social();
  const sortedFeed = social.sortByDate(unsortedFeed);
  const dispatchCall = new DispatchCalls(dispatch);
  const [height, setHeight] = useState(window.innerHeight - 61);
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dispatchCall.socialFeed();

    const handleResize = () => {
      setHeight(window.innerHeight - 61);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, reload]);

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

  return (
    <div className="Post-div" style={{height: height}}>
      {sortedFeed.map((data) => {
        return (
          <div className="Post-div-box">
            <p className="Post-name">{data.User.firstName} {data.User.lastName}</p>
            <p className="Post-username">@{data.User.username}</p>
            <p className="Post-caption">{social.findHashtags(data.caption)}</p>
            {data.photo && <img className="Post-image" src={social.convertImageToBase64(data.photo)}/>}
            <p className="Post-bottom">
              <span>
                {(() => {
                  let activeLike = false;

                  if (data.Likes && data.Likes.length > 0) {
                    activeLike = data.Likes.find(obj => obj.userId === user.id);
                  }

                  return activeLike ? <FontAwesomeIcon icon={faHeart02} className="Post-activeLike" onClick={() => handleDislike(data.id)} /> :
                                      <FontAwesomeIcon icon={faHeart} className="Post-like" onClick={() => handleLike(data.id)}/>
    
                })()}
                <FontAwesomeIcon icon={faComment} className="Post-icon" onClick={() => navigate(`/following/${data.id}`)}/>
              </span>
            <small>{new Date(data.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></p>
          </div>
        )
      })}
    </div>
  )
}