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
    return (
      <div>
        <h4>Notifications</h4>
        {notifications.map((data, index) => (
          <div key={index} className="ExploreModal-div_notification">
            <img src={data.User.profilePhoto} className="ExploreModal-profilePhoto"/>
            <div>
              <p className="ExploreModal-name">{data.User.firstName} {data.User.lastName}</p>
              <p className="ExploreModal-notif_label">Liked your post</p>
            </div>
            <p className="ExploreModal-time">
              {dispatchCall.NotificationsDateFormat(data.createdAt)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  if (notifications === null) return null;

  return ( 
    <div className="ExploreModal">
    <div className="ExploreModal-div">
      {displayNotifications()}
    </div>
    </div> 
  ) 
}