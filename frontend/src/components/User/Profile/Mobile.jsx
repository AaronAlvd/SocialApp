import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 

import DispatchCalls from "../../../StateManagement/dispatch";
import UpdateProfile from '../../Modals/UpdateProfile/UpdateProfile';
import Body from '../../Posts/Post/body';

export default function Mobile({ user }) {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const userProfile = useSelector(state => state.users.profile);
  const [width, setWidth] = useState(window.innerWidth); 
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCalls.UserProfile(user.id)
    }

    fetch()
  }, [])

  if (!userProfile) return null;

  return ( 
    <div style={{maxHeight: `${height - 60}px`}}>
      <div className="border-b-1 border-b-gray-300">
        <div className="flex justify-center">
          <p className="text-[18px] font-bold h-[20px]">
            {user.firstName} {user.lastName}
          </p>
        </div>

        <div className="flex justify-center my-[10px]">
         <img src={user.profilePhoto} className="w-[80px] h-[80px] rounded-[50%] bg-center object-cover"/>
        </div>

        <p className="font-semibold text-[14px] flex justify-center mb-[5px]">
          @{userProfile.username.toLowerCase()}
        </p>

        <div className="flex justify-center gap-[20px]">
          <div className="flex items-center flex-col">
            <p className="text-[16px] font-bold">{dispatchCalls.FormatNumbers(userProfile.following)}</p>
            <p className="text-[12px] h-[13px]">Following</p>
          </div>
          <div className="flex items-center flex-col">
            <p className="text-[16px] font-bold">{dispatchCalls.FormatNumbers(userProfile.followers)}</p>
            <p className="text-[12px] h-[13px]">Followers</p>
          </div>
          <div className="flex items-center flex-col">
            <p className="text-[16px] font-bold">{dispatchCalls.FormatNumbers(userProfile.posts)}</p>
            <p className="text-[12px] h-[13px]">Posts</p>
          </div>
          <div className="flex items-center flex-col">
            <p className="text-[16px] font-bold">{dispatchCalls.FormatNumbers(userProfile.likes)}</p>
            <p className="text-[12px] h-[13px]">Likes</p>
          </div>
        </div>

        <div className="flex justify-center my-[20px]">
          <button className="text-[14px] font-semibold bg-[rgb(215,215,215)] w-[150px] h-[30px] rounded-[7px]">
            Edit Profile
          </button>
        </div>
      </div>
      <Body optional="profile"/>
    </div> 
  ) 
}