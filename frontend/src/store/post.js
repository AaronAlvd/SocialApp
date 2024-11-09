import { csrfFetch } from './csrf';

const GET_POSTS = 'post/GET_POSTS';

const setPosts = (data) => {
  return {
    type: GET_POSTS,
    payload: data,
  }
}

export const getPosts = () => async (dispatch) => {
  const response = await csrfFetch('api/post/following');
  if (!response.ok) throw new Error('Failed to fetch posts');
  const data = await response.json();
  dispatch(setPosts(data));
}

export const getPostDetail = (postId) => async (dispatch) => {
  const response = await csrfFetch(`api/post/${postId}`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  const data = await response.json();
  dispatch(setPosts(data));
}

const initialState = {
  posts: []
}

const postReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload}
    default:
      return state
  }
}

export default postReducer;