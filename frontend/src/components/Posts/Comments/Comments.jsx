import './Comments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Social from '../../../SocialClass/social';

export default function Comments({ data }) {
  const social = new Social();

  return data.map((obj) => {

    return (
      <div className='Comments-div'>
        <div className='Comments-div-photo'>
          {obj.User.profilePhoto ? <img src={`${social.profilePhoto(obj.User.profilePhoto)}`} className='Comments-photo'/> : 
                                   <FontAwesomeIcon icon={faUserCircle} className='Comments-icon'/>}
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