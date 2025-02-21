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
   return this.dispatch(postActions.getPosts())
  }
  newPost(data) {
    return this.dispatch(postActions.createPost(data))
  }
  removePost(data) {
    return this.dispatch(postActions.deletePost(data))
  }
  GroupPost(data) {
    return this.dispatch(postActions.fetchGroupPosts(data))
  }
  UserPost(data) {
    return this.dispatch(postActions.fetchUserPosts(data))
  }
  Explore() {
    return this.dispatch(postActions.fetchExlporePosts())
  }
  Trending() {
    return this.dispatch(postActions.fetchTrendingPosts())
  }

  comments(data) {
    return this.dispatch(commentActions.fetchComments(data))
  }
  removeComment(data, data2) {
    return this.dispatch(commentActions.deleteComment(data, data2))
  }
  createComment(data) {
    return this.dispatch(commentActions.addComment(data))
  }

  following() {
    return this.dispatch(userActions.fetchFollowing())
  }
  searchFollowing(data) {
    return this.dispatch(userActions.queryFollowing(data))
  }
  UserProfile(data) {
    return this.dispatch(userActions.fetchProfile(data))
  }
  UserGroups() {
    return this.dispatch(userActions.fetchGroups())
  }
  GroupProfile(data) {
    return this.dispatch(userActions.fetchGroup(data))
  }
  ExploreQuery(data) {
    return this.dispatch(userActions.queryExplore(data))
  }
  FollowRequest(data) {
    return this.dispatch(userActions.followRequest(data))
  }
  UnfollowRequest(data) {
    return this.dispatch(userActions.unfollowRequest(data))
  }

  chats() {
    return this.dispatch(messageActions.fetchChats())
  }
  SendMessage(data) {
    return this.dispatch(messageActions.sendMessage(data))
  }
  FetchMessages(data) {
    return this.dispatch(messageActions.fetchChat(data))
  }
  DeleteMessage(data) {
    return this.dispatch(messageActions.removeMessage(data))
  }

  RestoreUser() {
    return this.dispatch(sessionActions.restoreUser())
  }
  UpdateUser(data) {
    return this.dispatch(sessionActions.updateUser(data))
  }
  SignupUser(data) {
    return this.dispatch(sessionActions.signUpUser(data))
  }
  DeleteUser() {
    return this.dispatch(sessionActions.deleteAccount())
  }
  FetchNotifications() {
    return this.dispatch(sessionActions.fetchNotifications())
  }

  handleLike(data) {
    return this.dispatch(likeActions.likePost(data))
  }
  handleDislike(data) {
    return this.dispatch(likeActions.unlikePost(data))
  }
}