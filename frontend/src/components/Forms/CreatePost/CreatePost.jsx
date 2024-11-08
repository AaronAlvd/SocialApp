import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Social from '../../../SocialClass/social';
import './CreatePost.css';

export default function CreatePost() {
  const user = useSelector(state => state.session.user);
  const [width, setWidth] = useState(window.innerWidth - 201);
  const [height, setHeight] = useState(window.innerHeight - 61);
  const social = new Social();
  const [formInput, setFormInput] = useState({
    caption: '',
    imageFile: null,
  })

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth - 201);
      setHeight(window.innerHeight - 61);
      return null;
    };

    document.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'caption') {
      setFormInput(() => {
        const obj = {...formInput};
        obj[name] = value;
        return obj;
      });
    } else if (name === 'imageFile') {
      setFormInput(() => {
        const obj = {...formInput};
        obj[name] = e.target.files[0]
        return obj;
      });
    }
  }
  
  return (
    <div className='CreatePost-div' style={{ width: `${width}px`, height: `${height}px` }}>
      <div className="CreatePost-div-form">
        <p className='CreatePost-name'>{user ? user.firstName : null} {user ? user.lastName : null}</p>
        <p className='CreatePost-username'>@{user ? user.username : null}</p>
        <form className='CreatePost-form'>
          <textarea className='CreatePost-textarea' placeholder='tell us whats on your mind...' name='caption' value={formInput.caption} 
                    onChange={(e) => handleChange(e)} />
          
          {formInput.imageFile ? <img src={URL.createObjectURL(formInput.imageFile)}/> : <div className='CreatePost-div-imageFile'>
            <label htmlFor='CreatePost-imageFile'><FontAwesomeIcon icon={faImage} className='CreatePost-imageIcon'/></label>
            <input type='file' id='CreatePost-imageFile' name='imageFile' style={{ display: 'none'}} onChange={(e) => handleChange(e)}/>
          </div>}
        </form>
      </div>
    </div>
  )
}
