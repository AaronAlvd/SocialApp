import DispatchCalls from "../../../StateManagement/dispatch";
import Social from "../../../StateManagement/social";
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { Comments } from '../../Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart02 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./header/header";
import './Post.css';

export default function Post() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId || null;
  const user = useSelector(state => state.session.user);
  const social = new Social();
  const dispatchCall = new DispatchCalls(dispatch);
  const [posts, setPosts] = useState();
  const [reload, setReload] = useState(false);
  const [text, setText] = useState();
  const [like, setLike] = useState();
  const [showComments, setShowComments] = useState();
  const [isVisible, setIsVisible] = useState({});
  const divRefs = useRef([]);

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCall.socialFeed();
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

  }, [text]);

  useEffect(() => {
    if (divRefs.current.length > 0) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.intersectionRatio,
          }));
        })
      })

      divRefs.current.forEach((item) => {
        if (item) {
          observer.observe(item);
        }
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [divRefs.current]);

  const handleLike = (postId) => {
    setLike((prev) => {
      const obj = {...prev}
      obj[postId] = false
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

  const handleComments = (id) => {
    if (showComments === id) {
      navigate('/following')
      return setShowComments('')
    }
    navigate(`/following/${id}`);
    return setShowComments(id);
  }

  if (!posts) return null;

  return (
    <div className="Post-div">
      <Header user={user}/>
      {posts.map((data, index) => {
        const ratio = isVisible[data.id];
        if (ratio === 0) return null
        console.log(ratio)
        // console.log(`Div ${data.id} is visible`)
        return (
          <div className="Post-div-box" key={data.id} ref={(el) => divRefs.current[index] = el}>
            <div style={{display: 'flex'}}>
              <img src={data.User.profilePhoto ? data.User.profilePhoto : defaultpfp} 
                   className="Post-img-profile" onClick={() => navigate(`/profile/user/${data.User.username}`)}/>
              <div>
                <p className="Post-name" onClick={() => navigate(`/profile/user/${data.User.username}`)}>
                  {data.User.firstName} {data.User.lastName}</p>
                <p className="Post-username" onClick={() => navigate(`/profile/user/${data.User.username}`)}>@{data.User.username}</p>
              </div>
            </div>
            <p className="Post-caption">{social.findHashtags(data.caption)}</p>
            {data.photo && <img className="Post-image" src={data.photo}/>}
            <div className="Post-bottom">
              <div style={{display: 'flex'}}>
                <div className="Post-div-icon">
                  {like[data.id] ? <FontAwesomeIcon icon={faHeart02} className="Post-icon" onClick={() => handleDislike(data.id)} /> 
                             : <FontAwesomeIcon icon={faHeart} className="Post-icon" onClick={() => handleLike(data.id)} />}
                             
                  <small style={{margin: '0 5px 0 10px'}}>{data.Likes.length}</small>
                </div>
                <div className="Post-div-icon" onClick={() => handleComments(data.id)} style={{cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faComment} className="Post-icon" />
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