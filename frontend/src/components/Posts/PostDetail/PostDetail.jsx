import './PostDetail.css';
import DispatchCalls from '../../../SocialClass/dispatch';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PostDetail() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const post = useSelector(state => state.posts.posts)[0];

  useEffect(() => {
    dispatchCalls.postDetail(postId)
  }, [dispatch])

  return (
    <div>
      <div className="Post-div-box">
            <p className="Post-name">{post.User.firstName} {post.User.lastName}</p>
            <p className="Post-username">@{post.User.username}</p>
            <p className="Post-caption">{social.findHashtags(post.caption)}</p>
            {post.photo && <img className="Post-image" src={social.convertImageToBase64(post.photo)}/>}
            <p className="Post-bottom">
              <span>
                {(() => {
                  let activeLike = false;

                  if (post.Likes && post.Likes.length > 0) {
                    activeLike = post.Likes.find(obj => obj.userId === user.id);
                  }

                  return activeLike ? <FontAwesomeIcon icon={faHeart02} className="Post-activeLike" onClick={() => handleDislike(post.id)} /> :
                                      <FontAwesomeIcon icon={faHeart} className="Post-like" onClick={() => handleLike(post.id)}/>
    
                })()}
                <FontAwesomeIcon icon={faComment} className="Post-icon" onClick={() => navigate(`/following/${post.id}`)}/>
              </span>
            <small>{new Date(post.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></p>
          </div>
    </div>
  )

}