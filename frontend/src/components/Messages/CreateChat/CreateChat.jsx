import './CreateChat.css';
import { useSelector, useDispatch } from 'react-redux';
import DispatchCalls from '../../../StateManagement/dispatch';
import { HiMagnifyingGlass } from "react-icons/hi2";
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { useState, useEffect } from 'react';
import './CreateChat.css';

export default function CreateChat() {
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const user = useSelector((state) => state.session.user);
  const results = useSelector((state) => state.users.users);
  const [query, setQuery] = useState('');

  useEffect(() => {
    
    if (query !== '') {
      dispatchCalls.searchFollowing(query)
    }

  },[query])

  const formatResults = () => {
    let retArr = Array(results.length)

    for (let i = 0; i < results.length; i++) {
      const user = results[i]
      retArr[i] = (
        <div className='CreateChat-userBox'>
          <img src={user.profilePhoto ? user.profilePhoto : defaultpfp} className='CreateChat-profilePhoto'/>
          <div className='CreateChat-userBox-row'>
            <p className='CreateChat-username'>{user.username}</p>
            <p className='CreateChat-name'>{user.firstName} {user.lastName}</p>
          </div>
        </div>
      )
    }

    return retArr;
  }

  return (
    <div className='CreateChat-div'>
      <div className='CreateChat-inputBox'>
        <HiMagnifyingGlass className='CreateChat-icon'/>
        <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} className='CreateChat-input' placeholder='Search...'/>
      </div>
      {(results && (query !== '')) && formatResults()}
    </div>
  )
}