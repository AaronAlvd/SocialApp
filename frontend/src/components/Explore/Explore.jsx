import DispatchCalls from "../../StateManagement/dispatch";
import defaultpfp from '../../assets/Default_pfp.jpg';
import { Comments } from '../Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart02 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Explore.css';

export default function Post() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId || null;
  const user = useSelector(state => state.session.user);
  const dispatchCall = new DispatchCalls(dispatch);
  const [posts, setPosts] = useState();
  const [reload, setReload] = useState(false);
  const [text, setText] = useState();
  const [like, setLike] = useState();
  const [showComments, setShowComments] = useState();

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCall.Explore();
      const obj = {}

      for (let item of response) {
        obj[item.id] = item.Like
      }

      setLike(obj);
      setPosts(response);
    }

    if (!posts) {
      fetch()
    }

  }, [text, reload]);

  const handleLike = (postId) => {
    setLike((prev) => {
      const obj = {...prev}
      obj[postId] = true
      return obj
    })

    const data = {
      postId: postId,
      commentId: '',
    }
    dispatchCall.handleLike(data);
    return setReload(!reload)
  };

  const handleDislike = (postId) => {
    setLike((prev) => {
      const obj = {...prev}
      obj[postId] = false
      return obj
    })

    const data = {
      postId: postId,
      commentId: '',
    }
    dispatchCall.handleDislike(data);
    return setReload(!reload)
  }

  const handleDropdown = (id) => {
    const response = confirm('Confirm Delete Post')

    if (response) {
      return dispatchCall.removePost(id)
    }
  }

  const handleComments = (id) => {
    
    if (showComments === id) {
      navigate('/explore')
      return setShowComments('')
    }
    navigate(`/explore/${id}`);
    return setShowComments(id);
  }

  if (!posts) return null;

  return (
    <div className="Explore-div">
      {posts.map((data) => {
        return (
          <div className="Explore-div-box" key={data.id}>
            <div style={{display: 'flex'}}>
              <img src={data.User.profilePhoto ? data.User.profilePhoto : defaultpfp} 
                   className="Explore-img-profile" onClick={() => navigate(`/profile/user/${data.User.username}`)}/>
              <div>
                <p className="Explore-name" onClick={() => navigate(`/profile/user/${data.User.username}`)}>
                  {data.User.firstName} {data.User.lastName}</p>
                <p className="Explore-username" onClick={() => navigate(`/profile/user/${data.User.username}`)}>@{data.User.username}</p>
              </div>
            </div>
            <p className="Explore-caption">{dispatchCall.findHashtags(data.caption)}</p>
            {data.photo && <img className="Explore-image" src={data.photo}/>}
            <div className="Explore-bottom">
              <div style={{display: 'flex'}}>
                <div className="Explore-div-icon">
                  {like[data.id] ? <FontAwesomeIcon icon={faHeart02} className="Explore-icon" onClick={() => handleDislike(data.id)} /> 
                             : <FontAwesomeIcon icon={faHeart} className="Explore-icon" onClick={() => handleLike(data.id)} />}
                             
                  <small style={{margin: '0 5px 0 10px'}}>{data.Likes.length}</small>
                </div>
                <div className="Explore-div-icon" onClick={() => handleComments(data.id)} style={{cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faComment} className="Explore-icon" />
                  <small style={{margin: '0 5px 0 10px'}}>{data.Comments.length}</small>
                </div>
              </div>
            <small>{new Date(data.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></div>
            {(showComments === data.id || data.id === postId) && <Comments userId={data.userId}/>}
          </div>
        )
      })}
    </div>
  )
}