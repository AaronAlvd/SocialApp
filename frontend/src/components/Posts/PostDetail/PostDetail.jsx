import './PostDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart02 } from '@fortawesome/free-solid-svg-icons';
import DispatchCalls from '../../../SocialClass/dispatch';
import Social from '../../../SocialClass/social';
import { Comments } from '../../Comment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PostDetail() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const dispatchCalls = new DispatchCalls(dispatch);
  const social = new Social();
  const post = useSelector(state => state.posts.posts)[0];
  const [height, setHeight] = useState(window.innerHeight - 61);
  const [width, setWidth] = useState(window.innerWidth - 201);
  const [reload, setReload] = useState(true);

  useEffect(() => {

    const handleResize = () => {
      setHeight(window.innerHeight - 61);
      setWidth(window.innerWidth - 201);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, reload]);

  useEffect(() => {
    dispatchCalls.postDetail(postId);
  }, [dispatch])

  return (
    <div className='PostDetail-div' style={{width: `${width}px`, height: `${height}px`}}>
          <div className="PostDetail-div-box" style={{height: `${height}px`}}>
            <p className="PostDetail-name">{post.User.firstName} {post.User.lastName}</p>
            <p className="PostDetail-username">@{post.User.username}</p>
            <p className="PostDetail-caption">{social.findHashtags(post.caption)}</p>
            {post.photo && <img className="PostDetail-image" src={social.convertImageToBase64(post.photo)}/>}
            <p className="PostDetail-bottom">
              <span>
                {(() => {
                  let activeLike = false;

                  if (post.Likes && post.Likes.length > 0) {
                    activeLike = post.Likes.find(obj => obj.userId === user.id);
                  }

                  return activeLike ? <FontAwesomeIcon icon={faHeart02} className="PostDetail-activeLike" onClick={() => handleDislike(post.id)} /> :
                                      <FontAwesomeIcon icon={faHeart} className="PostDetail-like" onClick={() => handleLike(post.id)}/>
    
                })()}
                <FontAwesomeIcon icon={faComment} className="PostDetail-icon" onClick={() => navigate(`/following/${post.id}`)}/>
              </span>
            <small>{new Date(post.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></p>
            <div><Comments data={post.Comments}/></div>
          </div>
    </div>
  )
}