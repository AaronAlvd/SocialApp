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
  socialFeedGroups() {
    return this.dispatch(postActions.getGroupPosts())
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
  removeComment(data) {
    return this.dispatch(commentActions.deleteComment(data))
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

  chats() {
    return this.dispatch(messageActions.fetchChats())
  }

  RestoreUser() {
    return this.dispatch(sessionActions.restoreUser())
  }

  handleLike(data) {
    return this.dispatch(likeActions.likePost(data))
  }

  handleDislike(data) {
    return this.dispatch(likeActions.unlikePost(data));
  }

  SignupUser(data) {
    return this.dispatch(sessionActions.signUpUser(data))
  }

}