import Social from "./social";
import * as postActions from '../store/post';
import * as sessionActions from '../store/session';

export default class DispatchCalls extends Social {
  constructor(dispatch) {
    super();
    this.dispatch = dispatch
  }
  
  SocialFeed() {
    this.dispatch(postActions.getPosts())
  }

  RestoreUser() {
    this.dispatch(sessionActions.restoreUser())
  }
}