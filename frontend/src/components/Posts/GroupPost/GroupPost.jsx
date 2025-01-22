import DispatchCalls from "../../../StateManagement/dispatch";
import defaultpfp from '../../../assets/Default_pfp.jpg';
import CreatePost from '../../Modals/CreatePost/CreatePost';
import { Comments } from '../../Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaImage } from "react-icons/fa6";
import { MdVideoLibrary } from "react-icons/md";
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart02 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from '../../../context/modal';
import Header from '../Post/header';
import './GroupPost.css';

export default function GroupPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const params = useParams();
  const postId = params.postId || null;
  const uploadImgRef = useRef(null);
  const uploadVidRef = useRef(null);
  const dispatchCall = new DispatchCalls(dispatch);
  const unsortedFeed = useSelector((state) => state.posts.groupPosts);
  const { setModalContent } = useModal();
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

  const handleComments = (id) => {
    
    if (showComments === id) {
      navigate('/groups')
      return setShowComments('')
    }
    navigate(`/groups/${id}`);
    return setShowComments(id);
  }

  if (!unsortedFeed || !user) return null;

  return (
    <div className="GroupPost-div">
      <Header user={user}/>
      {unsortedFeed.map((data) => {
        return (
          <div className="GroupPost-div-box">
            <div style={{display: 'flex'}}>
              <img src={data.Group.profilePhoto ? data.Group.profilePhoto : defaultpfp} 
                   className="GroupPost-img-profile" onClick={() => navigate(`/profile/group/${data.Group.groupName}`)}/>
              <div>
                <p className="GroupPost-name" onClick={() => navigate(`/profile/group/${data.Group.groupName}`)}>{data.Group.groupName}</p>
                <p className="GroupPost-username" onClick={() => navigate(`/profile/user/${data.User.username}`)}>@{data.User.username}</p>
              </div>
            </div>
            <p className="GroupPost-caption">{dispatchCall.findHashtags(data.caption)}</p>
            {data.photo && <img className="GroupPost-image" src={data.photo}/>}
            <div className="GroupPost-bottom">
              <div style={{display: 'flex'}}>
                <div className="GroupPost-div-icon">
                {data.Like ? <FontAwesomeIcon icon={faHeart02} className="GroupPost-icon" onClick={() => handleDislike(data.id)} /> 
                           : <FontAwesomeIcon icon={faHeart} className="GroupPost-icon" onClick={() => handleLike(data.id)}/>}
                  <small style={{margin: '0 5px 0 10px'}}>{data.Likes.length}</small>
                </div>
                <div className="GroupPost-div-icon" onClick={() => handleComments(data.id)} style={{cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faComment} className="GroupPost-icon" />
                  <small style={{margin: '0 5px 0 10px'}}>{data.Comments.length}</small>
                </div>
              </div>
            <small>{new Date(data.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></div>
            {(showComments === data.id || postId === data.id) && <div style={{width: '65vw'}}><Comments userId={data.userId}/></div>}
          </div>
        )
      })}
    </div>
  )
}