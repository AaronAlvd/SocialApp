import './Comments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Social from '../../../SocialClass/social';
import { useNavigate } from 'react-router-dom'

export default function Comments({ data }) {
  const social = new Social();
  const navigate = useNavigate();

  return data.map((obj) => {

    return (
      <div className='Comments-div'>
        <div className='Comments-div-photo'>
          {obj.User.profilePhoto ? <img src={`${social.profilePhoto(obj.User.profilePhoto)}`} className='Comments-photo' onClick={() => navigate(`/users/${obj.User.id}`)}/> : 
                                   <FontAwesomeIcon icon={faUserCircle} className='Comments-icon' onClick={() => navigate(`/user/${obj.User.id}`)}/>}
        </div>
        <div>
          <p className='Comments-username'>@{obj.User.username}</p>
          <p className='Comments-comment'>{obj.comment}</p>
          <p className='Comments-username'>Reply</p>
        </div>
      </div>
    )
  })
};