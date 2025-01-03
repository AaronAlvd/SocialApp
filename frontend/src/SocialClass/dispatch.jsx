import Social from "./social";
import * as postActions from '../store/post';
import * as sessionActions from '../store/session';
import * as likeActions from '../store/like';
import * as messageActions from '../store/messages';

export default class DispatchCalls extends Social {
  constructor(dispatch) {
    super();
    this.dispatch = dispatch
  }
  
  socialFeed() {
    this.dispatch(postActions.getPosts());
  }

  socialFeedGroups() {
    this.dispatch(postActions.getGroupPosts())
  }

  chats() {
    this.dispatch(messageActions.fetchChats())
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

  SignupUser(data) {
    this.dispatch(sessionActions.signUpUser(data))
  }

  UserProfile(data) {
    this.dispatch()
  }
}