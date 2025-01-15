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

  if (!unsortedFeed) return null;

  return (
    <div className="GroupPost-div">
      <div className="GroupPost-section_1">
        <div className="row_1">
          <img src={user.profilePhoto ? user.profilePhoto : defaultpfp}
               className="GroupPost-img-profile"/>
          <label className="GroupPost-label" onClick={() => setModalContent(<CreatePost user={user}/>)}>Share a post</label>
        </div>
        <div className="row_2">
          <span style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => uploadImgRef.current.click()}>
            <input type="file" style={{display: 'none'}} ref={uploadImgRef} accept="image/*"/>
            <FaImage style={{fontSize: '18px'}}/>
            <label style={{marginLeft: '5px', fontWeight: '400', cursor: 'pointer'}}>Photo</label>
          </span>
          <span style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => uploadVidRef.current.click()}>
            <input type="file" style={{display: 'none'}} ref={uploadVidRef} accept="video/*"/>
            <MdVideoLibrary style={{fontSize: '18px'}}/>
            <label style={{marginLeft: '5px', fontWeight: '400', cursor: 'pointer'}}>Video</label>
          </span>
        </div>
      </div>
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
            <p className="GroupPost-bottom">
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
            <small>{new Date(data.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></p>
            {(showComments === data.id || postId === data.id) && <div style={{width: '65vw'}}><Comments userId={data.userId}/></div>}
          </div>
        )
      })}
    </div>
  )
}