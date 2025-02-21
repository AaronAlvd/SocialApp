import { useSelector, useDispatch } from "react-redux";
import { useModal } from '../../../context/modal.jsx';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import defaultpfp from '../../../assets/Default_pfp.jpg';
import Body from '../../Posts/Post/body.jsx';
import ProfileModal from '../ProfileModal/ProfileModal.jsx';

export default function Desktop({ user }) {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight);
  const userProfile = useSelector(state => state.users.profile);

  const class01 = width > 1439 ? 'relative flex flex-col p-[5px] h-[170px]' : 'relative w-[100%] px-[5px] pt-[5px]'
  const class02 = 'border-1 min-h-[120px] w-[100%] rounded-[10px]'
  const class03 = width > 1439 ? `absolute transform translate-x-[30px] translate-y-[70px] rounded-[50%] w-[80px] h-[80px] object-cover bg-center` 
  : `absolute transform translate-x-[30px] translate-y-[-50px] rounded-[50%] w-[80px] h-[80px] object-cover bg-center`
  const class04 = 'grid grid-cols-[120px_1fr]'
  const class05 = 'text-[18px] font-bold'

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCalls.UserProfile(user.id)
    }

    fetch()
  }, [])

  const handleProfile = () => {
    if (user.id === 'fffbd13b-428a-4d50-a03e-2f65c1f20b0a' && process.env.NODE_ENV === 'production') {
      alert('CREATE, UPDATE, and DELETE features have been disabled for the demo account.')
    } else {
      return setModalContent(<EditProfile />)
    }
  }

  return (
    <div style={{height: `${height - 55}px`}} className="overflow-scroll">
      <div className={class01}>
        <div className={class02}></div>

        <img src={user.profilePhoto ? user.profilePhoto : defaultpfp} className={class03}/>

        <div className={class04}>
          <div></div>
          <div>
            <p className={class05}>@{user.username.toLowerCase()}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[547px_1fr]">
        <Body optional="profile"/>
        <ProfileModal />
      </div>
    </div>
  )
}