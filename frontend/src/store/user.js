import { csrfFetch } from "./csrf";

const FETCH_PROFILE = 'FETCH_PROFILE';
const FETCH_USER = 'FETCH_USER';
const FETCH_FOLLOWING = 'FETCH_FOLLOWING';
const FETCH_FOLLOWERS = 'FETCH_FOLLOWERS';
const QUERY_FOLLOWING =  'QUERY_FOLLOWING';


const setProfile = (data) => ({
  type: FETCH_PROFILE,
  payload: data,
});

const setUser = (data) => ({
  type: FETCH_USER,
  payload: data,
});

const setFollowing = (data) => ({
  type: FETCH_FOLLOWING,
  payload: data,
})

const setQueryFollowing = (data) => ({
  type: QUERY_FOLLOWING,
  payload: data,
})

export const queryFollowing = (query) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/search/following/${query}`)

    if (!response.ok) {

    }
    const data = await response.json()
    dispatch(setQueryFollowing(data));
    return data;
  } catch(error) {

  }
}

export const fetchProfile = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/${id}`)

    if (!response.ok) {

    }

    const data = await response.json();
    dispatch(setProfile(data))
    return data;

  } catch(error) {

  }
}

export const fetchUser = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/${id}`);

    if (!response.ok) {

    }

    const data = await response.json();
    dispatch(setUser(data));
    
  } catch(error) {

  }
}

export const fetchFollowing = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/users/following');

    if (!response.ok) {

    }

    const data = await response.json();
    dispatch(setFollowing(data));
    
  } catch(error) {

  }
}

const initialState = {
  users: null,
  following: null,
  followers: null,
  profile: null,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER: 
      return {...state, users: action.payload};
    case FETCH_FOLLOWING:
      return {...state, following: action.payload};
    case QUERY_FOLLOWING: 
      return {...state, users: action.payload};
    case FETCH_PROFILE:
      return {...state, profile: action.payload};
    default:
      return state;
  }
}