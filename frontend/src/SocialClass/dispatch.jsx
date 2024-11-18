import Social from "./social";
import * as postActions from '../store/post';
import * as sessionActions from '../store/session';
import * as likeActions from '../store/like';
import * as userActions from '../store/user';

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

  postDetail(postId) {
    this.dispatch(postActions.getPostDetail(postId))
  }

  handleDislike(data) {
    this.dispatch(likeActions.unlikePost(data));
  }

  UserProfile(data) {
    this.dispatch(userActions.getUser(data));
  }
}