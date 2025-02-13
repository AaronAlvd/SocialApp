import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import DispatchCalls from '../../../../StateManagement/dispatch';

import "./ExploreModal.css" 

export default function ExploreModal() {
  const location = useLocation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchCall = new DispatchCalls(dispatch);
  const notifications = useSelector(state => state.session.notifications);
  const [width, setWidth] = useState(window.innerWidth); 
  const [height, setHeight] = useState(window.innerHeight);


  useEffect(() => {
    async function fetch() {
      const response = await dispatchCall.FetchNotifications();
    }

    fetch();
  }, []);

  const displayNotifications = () => {
    const notifs = notifications.postLikes
    return (
      <div>
        <h4>Notifications</h4>
        {notifs.map((data, index) => (
          <div key={index} className="ExploreModal-div_notification">
            <img src={data.profilePhoto} className="ExploreModal-profilePhoto"/>
            <div>
              <p className="ExploreModal-name">{data.firstName} {data.lastName}</p>
              <p className="ExploreModal-notif_label">Liked your post</p>
            </div>
            <p className="ExploreModal-time">
              {index < 9 ? '1h' : '2h'}
            </p>
          </div>
        ))}
      </div>
    );
  };

  if (!notifications) return null;

  return ( 
    <div className="ExploreModal">
    <div className="ExploreModal-div">
      {displayNotifications()}
    </div>
    </div> 
  ) 
}