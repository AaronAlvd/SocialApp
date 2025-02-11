import { csrfFetch } from './csrf';

const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_GROUP_POSTS = 'FETCH_GROUP_POSTS';
const CREATE_POST = 'CREATE_POST';
const FETCH_COMMENTS = 'FETCH_COMMENTS';
const SET_COMMENT = 'CREATE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

const setPosts = (data) => {
  return {
    type: FETCH_POSTS,
    payload: data,
  }
}
const setGroupPosts = (data) => {
  return {
    type: FETCH_GROUP_POSTS,
    payload: data,
  }
}
const setPost = (data) => {
  return {
    type: CREATE_POST,
    payload: data,
  }
}
export const setComments = (data) => {
  return{
    type: FETCH_COMMENTS,
    payload: data,
  }
}
export const removeComment = (id, postId) => {
  return {
    type: DELETE_COMMENT,
    payload: [id, postId],
  }
}
export const setComment = (data) => {
  return {
    type: SET_COMMENT,
    payload: data
  }
}


export const getPosts = () => async (dispatch) => {
  const response = await csrfFetch('/api/posts/following');
  if (!response.ok) throw new Error('Failed to fetch posts');
  const data = await response.json();
  dispatch(setPosts(data));
  return data;
}
export const getGroupPosts = () => async (dispatch) => {
  const response = await csrfFetch('/api/posts/groups');
  if (!response.ok) throw new Error('Failed to fetch posts');
  const data = await response.json();
  dispatch(setGroupPosts(data));
}
export const getPostDetail = (postId) => async (dispatch) => {
  const response = await csrfFetch(`/api/post/${postId}`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  const data = await response.json();
  dispatch(setPosts(data));
}
export const fetchGroupPosts = (groupId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/posts/group/${groupId}`);
    if (!response) {}
    const data = await response.json();
    dispatch(setPosts(data))
    return data;
  } catch(error) {

  }
}
export const fetchUserPosts = (userId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/posts/user/${userId}`);
    if (!response) {}
    const data = await response.json();
    dispatch(setPosts(data))
    return data;
  } catch(error) {

  }
}
export const fetchExlporePosts = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/posts/explore');
    if (!response.ok){}
    const data = await response.json();
    dispatch(setPosts(data));
    return data;
  } catch(error) {

  }
}
export const fetchTrendingPosts = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/posts/trending');
    if (!response.ok){}
    const data = await response.json();
    dispatch(setPosts(data));
    return data;
  } catch(error) {

  }
}
export const createPost = (data) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        caption: data.caption,
        photo: data.file,
        groupId: data.groupId,
      })
    })

    if (!response.ok) {

    }
    const results = await response.json();
    return results;
  } catch(error) {

  }
}
export const deletePost = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (!response.ok) {

    }
    const data = await response.json();
  } catch(error) {

  }
}


const initialState = {
  posts: null,
  groupPosts: null,
  comments: null,
}

export default function postReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.payload}
    case FETCH_GROUP_POSTS:
      return {...state, groupPosts: action.payload}
    case FETCH_COMMENTS:
      return {...state, comments: action.payload}
    case SET_COMMENT: 
      return {...state, comments:[...state.comments, action.payload]};
      case DELETE_COMMENT: {
        const [commentId, postId] = action.payload;
      
        // Create a new comments array without the deleted comment
        const updatedComments = state.comments.filter(comment => comment.id !== commentId);
      
        // Create a new posts array with the updated comment count
        const updatedPosts = state.posts.map(post => 
          post.id === postId ? { ...post, Comments: post.Comments - 1 } : post
        );
      
        return { ...state, posts: updatedPosts, comments: updatedComments };
      }
    default:
      return state
  }
}
