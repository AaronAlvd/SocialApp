import Social from "./Social";
import * as postActions from '../store/post';

export default class DispatchCalls extends Social {
  constructor(dispatch) {
    super();
    this.dispatch = dispatch
  }
  
  SocialFeed() {
    this.dispatch(postActions.getPosts())
  }
}