import DispatchCalls from "../../../SocialClass/dispatch";
import Social from "../../../SocialClass/social";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo, useRef } from "react";
import './Post.css';

export default function Post() {
  const dispatch = useDispatch();
  const unsortedFeed = useSelector((state) => state.posts.posts);
  const social = new Social();
  const sortedFeed = social.sortByDate(unsortedFeed);
  const dispatchCall = new DispatchCalls(dispatch);
  const [height, setHeight] = useState(window.innerHeight - 61);

  useEffect(() => {
    dispatchCall.SocialFeed();

    const handleResize = () => {
      setHeight(window.innerHeight - 61);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch])

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
                <FontAwesomeIcon icon={faHeart} className="Post-icon"/>
                <FontAwesomeIcon icon={faComment} className="Post-icon"/>
              </span>
            <small>{new Date(data.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></p>
          </div>
        )
      })}
    </div>
  )
}