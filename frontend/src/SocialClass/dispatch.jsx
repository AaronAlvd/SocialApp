import Social from "./social";
import * as postActions from '../store/post';
import * as sessionActions from '../store/session';
import * as likeActions from '../store/like';
import * as messageActions from '../store/messages';
import * as userActions from '../store/user';
import * as commentActions from '../store/comments';

export default class DispatchCalls extends Social {
  constructor(dispatch) {
    super();
    this.dispatch = dispatch
  }
  
  socialFeed() {
    this.dispatch(postActions.getPosts())
  }

  socialFeedGroups() {
    this.dispatch(postActions.getGroupPosts())
  }

  comments(data) {
    this.dispatch(commentActions.fetchComments(data))
  }
  removeComment(data) {
    this.dispatch(commentActions.deleteComment(data))
  }
  createComment(data) {
    this.dispatch(commentActions.addComment(data))
  }

  following() {
    this.dispatch(userActions.fetchFollowing())
  }

  searchFollowing(data) {
    this.dispatch(userActions.queryFollowing(data))
  }

  UserProfile(data) {
    this.dispatch(userActions.fetchProfile(data))
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

}