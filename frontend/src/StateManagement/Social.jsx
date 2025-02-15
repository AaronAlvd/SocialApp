
export default class Social {
  constructor() {

  }

  findHashtags(string) {
    if (string === null) return null;

    let array = string.split(' ');

    for (let i = 1; i < array.length; i++) {
      if (!array[i].startsWith('#') && !array[i - 1].startsWith('#')) {
        array[i - 1] += ' ' + array[i];
        array.splice(i, 1);
        i--;
      } else {
        array[i] = <span className="Post-hashtag"> {array[i]}</span>
      }
    };

    return array;
  }
  findMentions(data) {

  }
  NotificationsDateFormat(timestamp) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(timestamp)) / 1000);
    
    if (diffInSeconds < 60) return 'now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 604800)}w`;
    return `${Math.floor(diffInSeconds / 31536000)}y`;
  }
  NotificationsFormat(array) {
    return array.map((data, index) => {
      if (data.type === 'comment') {
        return (
          <div key={index} className="ExploreModal-div_notification">
            <img src={data.User.profilePhoto} className="ExploreModal-profilePhoto"/>
            <div>
              <p className="ExploreModal-name">{data.User.firstName} {data.User.lastName}</p>
              <p className="ExploreModal-notif_label">Commented on your post</p>
            </div>
            <p className="ExploreModal-time">
              {this.NotificationsDateFormat(data.createdAt)}
            </p>
          </div>
        )
      } 
      else if (data.type === 'like') {
        return (
          <div key={index} className="ExploreModal-div_notification">
            <img src={data.User.profilePhoto} className="ExploreModal-profilePhoto"/>
            <div>
              <p className="ExploreModal-name">{data.User.firstName} {data.User.lastName}</p>
              <p className="ExploreModal-notif_label">Liked your post</p>
            </div>
            <p className="ExploreModal-time">
              {this.NotificationsDateFormat(data.createdAt)}
            </p>
          </div>
        )
      }
    })
  }
  NotificationsFilter(array, filter) {
    return array.map((data, index) => {
      if (data.type === filter && filter === 'comment') {
        return (
          <div key={index} className="ExploreModal-div_notification">
            <img src={data.User.profilePhoto} className="ExploreModal-profilePhoto"/>
            <div>
              <p className="ExploreModal-name">{data.User.firstName} {data.User.lastName}</p>
              <p className="ExploreModal-notif_label">Commented on your post</p>
            </div>
            <p className="ExploreModal-time">
              {this.NotificationsDateFormat(data.createdAt)}
            </p>
          </div>
        )
      } else if (data.type === filter && filter === 'like') {
        return (
          <div key={index} className="ExploreModal-div_notification">
            <img src={data.User.profilePhoto} className="ExploreModal-profilePhoto"/>
            <div>
              <p className="ExploreModal-name">{data.User.firstName} {data.User.lastName}</p>
              <p className="ExploreModal-notif_label">Liked your post</p>
            </div>
            <p className="ExploreModal-time">
              {this.NotificationsDateFormat(data.createdAt)}
            </p>
          </div>
        )
      } else if (data.type === filter && filter === 'follow') {
        return (
          <div key={index} className="ExploreModal-div_notification">
            <img src={data.User.profilePhoto} className="ExploreModal-profilePhoto"/>
            <div>
              <p className="ExploreModal-name">{data.User.firstName} {data.User.lastName}</p>
              <p className="ExploreModal-notif_label">Started following you</p>
            </div>
            <p className="ExploreModal-time">
              {this.NotificationsDateFormat(data.createdAt)}
            </p>
          </div>
        )
      }
    })
  }
}