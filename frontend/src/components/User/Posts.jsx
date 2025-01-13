import DispatchCalls from '../../StateManagement/dispatch';
import defaultpfp from '../../assets/Default_pfp.jpg';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Comments } from '../Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart02 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import './Posts.css';


export default function Posts({ posts }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId || null;
  const dispatchCall = new DispatchCalls(dispatch);
  const [showComments, setShowComments] = useState();

  const handleLike = (postId) => {
    const data = {
      postId: postId,
      commentId: '',
    }
    dispatchCall.handleLike(data);
  };

  const handleDislike = (postId) => {
    const data = {
      postId: postId,
      commentId: '',
    }
    dispatchCall.handleDislike(data);
  }

  const displayPosts = () => {
    const array = new Array(posts.length);

    for (let i = 0; i < posts.length; i++) {
      const data = posts[i];
      array[i] = (
        <div className="Post-div-box" >
          <div style={{display: 'flex'}}>
            <img src={data.User.profilePhoto ? dispatchCall.convertImageToBase64(data.User.profilePhoto) : defaultpfp} 
                 className="Post-img-profile" onClick={() => navigate(`/profile/user/${data.User.username}`)}/>
            <div>
              <p className="Post-name" onClick={() => navigate(`/profile/user/${data.User.username}`)}>
                {data.User.firstName || data.firstName} {data.User.lastName || data.lastName}</p>
              <p className="Post-username" onClick={() => navigate(`/profile/user/${data.User.username}`)}>@{data.User.username || data.username}</p>
            </div>
            {/* <BsThreeDotsVertical style={{transform: 'translate(280px, 0)'}} onClick={() => handleDropdown(data.id)}/> */}
          </div>
          <p className="Post-caption">{dispatchCall.findHashtags(data.caption)}</p>
          {data.photo && <img className="Post-image" src={dispatchCall.convertImageToBase64(data.photo)}/>}
          <p className="Post-bottom">
            <div style={{display: 'flex'}}>
              <div className="Post-div-icon">
                {data.Like ? <FontAwesomeIcon icon={faHeart02} className="Post-icon" onClick={() => handleDislike(data.id)} /> 
                           : <FontAwesomeIcon icon={faHeart} className="Post-icon" onClick={() => handleLike(data.id)} />}
                           
                <small style={{margin: '0 5px 0 10px'}}>{data.Likes.length}</small>
              </div>
              <div className="Post-div-icon" onClick={() => handleComments(data.id)} style={{cursor: 'pointer'}}>
                <FontAwesomeIcon icon={faComment} className="Post-icon" />
                <small style={{margin: '0 5px 0 10px'}}>{data.Comments.length}</small>
              </div>
            </div>
          <small>{new Date(data.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></p>
          {(showComments === data.id || data.id === postId) && <Comments userId={data.userId}/>}
        </div>
      )
    }
    return array;
  }

  return (
    <div>
      {displayPosts()}
    </div>
  )
}
