import DispatchCalls from "../../../SocialClass/dispatch";
import Social from "../../../SocialClass/social";
import defaultpfp from '../../../assets/Default_pfp.jpg';
import CreatePost from '../../Modals/CreatePost/CreatePost';
import { FaImage } from "react-icons/fa6";
import { MdVideoLibrary } from "react-icons/md";
import { Comments } from '../../Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart02 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from '../../../context/modal';
import './Post.css';

export default function Post() {
  const { setModalContent } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uploadImgRef = useRef(null);
  const uploadVidRef = useRef(null);
  const user = useSelector(state => state.session.user);
  const social = new Social();
  const dispatchCall = new DispatchCalls(dispatch);
  const unsortedFeed = useSelector((state) => state.posts.posts);
  const sortedFeed = social.sortByDate(unsortedFeed);
  const [reload, setReload] = useState(false);
  const [text, setText] = useState();
  const [showComments, setShowComments] = useState();

  useEffect(() => {
    dispatchCall.socialFeed();
  }, [text, reload]);

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

  const handleComments = (id) => {
    
    if (showComments === id) {
      return setShowComments('')
    }
    navigate(`/following/${id}`);
    return setShowComments(id);
  }

  if (!sortedFeed) return null;

  return (
    <div className="Post-div">
      <div className="Post-section_1">
        <div className="row_1">
          <img src={user.profilePhoto ? dispatchCall.convertImageToBase64(user.profilePhoto) : defaultpfp}
               className="Post-img-profile"/>
          <label className="Post-label" onClick={() => setModalContent(<CreatePost user={user}/>)}>Share a post</label>
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
      {sortedFeed.map((data) => {
        return (
          <div className="Post-div-box">
            <div style={{display: 'flex'}} onClick={() => navigate(`/profile/${data.User.username}`)}>
              <img src={data.User.profilePhoto ? dispatchCall.convertImageToBase64(data.User.profilePhoto) : defaultpfp} 
                   className="Post-img-profile"/>
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
                <div className="Post-div-icon" onClick={() => handleComments(data.id)} style={{cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faComment} className="Post-icon" />
                  <small style={{margin: '0 5px 0 10px'}}>{data.Comments.length}</small>
                </div>
              </div>
            <small>{new Date(data.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></p>
            {(showComments === data.id) && <Comments userId={data.userId}/>}
          </div>
        )
      })}
    </div>
  )
}