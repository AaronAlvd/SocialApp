import DispatchCalls from "../../../StateManagement/dispatch.jsx";
import Social from "../../../StateManagement/social.jsx";
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { BsThreeDots } from "react-icons/bs";
import Comments from '../../Comment/Comments/Comments.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart02 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import './Post.css';

export default function Body({ optional }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const social = new Social();
  const postId = params.postId || null;
  const user = useSelector(state => state.session.user);
  const posts = useSelector(state => state.posts.posts) || null;
  const dispatchCall = new DispatchCalls(dispatch);
  const [reload, setReload] = useState(false);
  const [showMenu, setShowMenu] = useState();
  const [like, setLike] = useState();
  const [likeCount, setLikeCount] = useState();
  const [showComments, setShowComments] = useState('');
  // const [isVisible, setIsVisible] = useState({});
  const divRefs = useRef([]);

  useEffect(() => {

    function afterResponse(data) {
      let obj1 = {};
      let obj2 = {};
      let obj3 = {};

      for (let item of data) {
        obj1[item.id] = item.Likes.length;
        obj2[item.id] = item.Like;
        obj3[item.id] = false;
      }

      setLikeCount(obj1);
      setLike(obj2);
      setShowMenu(obj3);
    } 

    async function fetch() {
      if (optional === 'explore') {
        const response = await dispatchCall.Explore();
        return afterResponse(response);
      } else if (optional === 'following') {
        const response = await dispatchCall.socialFeed();
        return afterResponse(response);
      } else if (optional === 'profile') {
        if (location.pathname === '/profile') {
          const response = await dispatchCall.UserPost(user.id);
          return afterResponse(response);
        }
        const response = await dispatchCall.UserPost(params.userId);
        return afterResponse(response);
      }
    }

    fetch()

  }, [reload]);

  // useEffect(() => {
  //   if (posts) {
  //     if (divRefs.current.length === posts.length) {
  //       const observer = new IntersectionObserver(entries => {
  //         entries.forEach((entry) => {
  //           console.log(entry.target.id)
  //           setIsVisible((prev) => ({
  //             ...prev,
  //             [entry.target.id]: entry.intersectionRatio,
  //           }));
  //         })
  //       })

  //       divRefs.current.forEach((item) => {
  //         if (item) {
  //           observer.observe(item);
  //         }
  //       });

  //       return () => {
  //         observer.disconnect();
  //       };
  //     }
  //   }
  // }, []);

  const handleLike = (postId) => {
    setLike((prev) => {
      const obj = {...prev}
      obj[postId] = true
      return obj
    });

    setLikeCount((prev) => {
      const obj = {...prev}
      const prevLike = obj[postId] 
      obj[postId] = prevLike + 1
      return obj
    });

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

    setLikeCount((prev) => {
      const obj = {...prev}
      const prevLike = obj[postId] 
      obj[postId] = prevLike - 1
      return obj
    });

    const data = {
      postId: postId,
      commentId: '',
    }

    dispatchCall.handleDislike(data);
    return setReload(!reload)
  };
  const handleComments = (id) => {
    if (showComments === id) {
      if (/^\/following(\/.*)?$/.test(location.pathname)) {
        navigate('/following');
        setShowComments('');
      } else if (/^\/explore(\/.*)?$/.test(location.pathname)) { // Matches root or top-level paths
        navigate('/explore');
        setShowComments('');
      } else if (/^\/profile\/user(\/.*)?$/.test(location.pathname)){
        navigate(`/profile/user/${params.userId}`);
        setShowComments('');
      }
    } else {
      if (location.pathname === '/explore') {
        navigate(`/explore/${id}`);
      } else if (location.pathname === '/following') {
        navigate(`/following/${id}`);
      } else if (/^\/profile\/user(\/.*)?$/.test(location.pathname)) {
        navigate(`/profile/user/${params.userId}/${id}`);
      }
      setShowComments(id);
    }
  };
  const handleDelete = (id) => {
    const response = dispatchCall.removePost(id)
    handleMenuChange(id);
    setReload(prev => !prev)
  };
  const displayDropdown = (data) => {
    return (
      <div className="Post-menu">
        <p className='Post-menu_options' onClick={() => handleDelete(data.id)}>Delete</p>
        <p className='Post-menu_options'>Edit</p>
      </div>
    )
  };
  const handleMenuChange = (id) => {
    const obj = {...showMenu}
    obj[id] = !showMenu[id]
    return setShowMenu(obj)
  };
  const displayPhoto = (photo) => {
    return (
      <img className="Post-image" src={photo} alt="Post" />
    )
  };

  if (!posts || !showMenu ) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (posts.length === 0 && optional === 'following') {
    return <h2>Follow More People!</h2>
  }

  return (
    <div className="Post-div">
      {posts.map((data, index) => {
        // const ratio = isVisible[data.id];
        // if (ratio === 0) return null
        return (
          <>
          {index !== 0 && <div className="Post-line"/>}
          <div className="Post-div-box" key={data.id} id={data.id} ref={(el) => divRefs.current[index] = el}>
            <div className="relative flex justify-between px-[5px]">
              <div className="flex">
                <img src={data.User.profilePhoto ? data.User.profilePhoto : defaultpfp}
                     className="Post-img-profile" onClick={() => navigate(`/user/${data.User.username}`)}/>

                <div>
                  <p className="Post-name" onClick={() => navigate(`/user/${data.User.username}`)}>
                    {data.User.firstName} {data.User.lastName}</p>
                  <p className="Post-username" onClick={() => navigate(`/user/${data.User.username}`)}>@{data.User.username}</p>
                </div>
              </div>

              {data.userId === user.id && <BsThreeDots className="Post-threeDots" onClick={() => handleMenuChange(data.id)}/>}
              {showMenu[data.id] && displayDropdown(data)}
            </div>

            <p className="Post-caption">{social.findHashtags(data.caption)}</p>

            {data.photo && displayPhoto(data.photo)}

            <div className="Post-bottom">
              <div className="flex">
                <div className="Post-div-icon">
                  {like[data.id] ? <FontAwesomeIcon icon={faHeart02} className="Post-icon" onClick={() => handleDislike(data.id)} /> 
                             : <FontAwesomeIcon icon={faHeart} className="Post-icon" onClick={() => handleLike(data.id)} />}
                             
                  <small style={{margin: '0 5px 0 10px'}}>{likeCount[data.id]}</small>
                </div>
                <div className="Post-div-icon" onClick={() => handleComments(data.id)} style={{cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faComment} className="Post-icon" />
                  <small style={{margin: '0 5px 0 10px'}}>{data.Comments}</small>
                </div>
              </div>
            <small>{new Date(data.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></div>
            {(showComments === data.id || data.id === postId) && <Comments userId={data.userId}/>}
          </div>
          </>
        )
      })}
    </div>
  )
}