import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 

import DispatchCalls from "../../../StateManagement/dispatch";

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
    <div>
      <div className="grid  p-[5px] grid-cols-[45px_1fr]">
       <img src={user.profilePhoto} className="w-[45px] h-[45px] rounded-[50%] bg-center object-cover"/>
       <div className="grid w-[100%] grid-cols-4">
        <div className="w-[100%] flex items-center flex-col">
          <p className="text-[18px] font-bold">{dispatchCalls.FormatNumbers(userProfile.posts)}</p>
          <p className="text-[12px]">Posts</p>
        </div>

        <div className="w-[100%] flex items-center flex-col">
          <p className="text-[18px] font-bold">{dispatchCalls.FormatNumbers(userProfile.followers)}</p>
          <p className="text-[12px]">Followers</p>
        </div>

        <div className="w-[100%] flex items-center flex-col">
          <p className="text-[18px] font-bold">{dispatchCalls.FormatNumbers(userProfile.following)}</p>
          <p className="text-[12px]">Following</p>
        </div>

        <div className="w-[100%] flex items-center flex-col">
          <p className="text-[18px] font-bold">{dispatchCalls.FormatNumbers(userProfile.likes)}</p>
          <p className="text-[12px]">Likes</p>
        </div>
       </div>
      </div>
    </div> 
  ) 
}