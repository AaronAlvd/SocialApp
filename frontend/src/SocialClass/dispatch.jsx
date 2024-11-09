import Social from "./social";
import * as postActions from '../store/post';
import * as sessionActions from '../store/session';
import * as likeActions from '../store/like';

export default class DispatchCalls extends Social {
  constructor(dispatch) {
    super();
    this.dispatch = dispatch
  }
  
  socialFeed() {
    this.dispatch(postActions.getPosts());
  }

  RestoreUser() {
    this.dispatch(sessionActions.restoreUser());
  }

  handleLike(data) {
    this.dispatch(likeActions.likePost(data));
  }

  handleDislike(data) {
    this.dispatch(likeActions.unlikePost(data));
  }
}