import { useEffect, useState, useRef, useMemo } from "react"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { IoFilterSharp } from "react-icons/io5";

import DispatchCalls from '../../../../StateManagement/dispatch';

import "./ExploreModal.css" 

export default function ExploreModal() {
  const location = useLocation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchCall = new DispatchCalls(dispatch);
  const notifications = useSelector(state => state.session.notifications);
  const [dropdown, setDropdown] = useState(false);
  const [filter, setFilter] = useState('none');
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth); 

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCall.FetchNotifications();
    }

    fetch();
  }, []);

  const displayDropdown = () => {
    return (
      <div className="ExploreModal-dropdown">
        <p className="ExploreModal-dropdown_label" onClick={() => setFilter('none')}>All</p>
        <p className="ExploreModal-dropdown_label" onClick={() => setFilter('comment')}>Comments</p>
        <p className="ExploreModal-dropdown_label" onClick={() => setFilter('follow')}>Followers</p>
        <p className="ExploreModal-dropdown_label" onClick={() => setFilter('like')}>Likes</p>
      </div>
    )
  }

  const displayNotifications = () => {
    if (filter === 'none') {
      return (
        <div>
          <div style={{position: 'relative', display: 'flex', justifyContent: 'space-between'}}>
            <h4>Notifications</h4>
            <IoFilterSharp onClick={() => setDropdown(prev => !prev)}/>
            {dropdown && displayDropdown()}
          </div>
          {dispatchCall.NotificationsFormat(notifications)}
        </div>
      );
    } else {
      return (
        <div>
          <div style={{position: 'relative', display: 'flex', justifyContent: 'space-between'}}>
            <h4>Notifications</h4>
            <IoFilterSharp onClick={() => setDropdown(prev => !prev)}/>
            {dropdown && displayDropdown()}
          </div>
          {dispatchCall.NotificationsFilter(notifications, filter)}
        </div>
      )
    }
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