import { csrfFetch } from "./csrf"

const USER_PROFILE = 'user/USER_PROFILE';

const setUserProfile = (data) => {
  return {
    type: USER_PROFILE,
    payload: data,
  }
}

export const getUser = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/user/${id}`);

  if (!response.ok) throw new Error('User was not found');

  const data = await response.json();

  dispatch(setUserProfile(data));

  return data;
}

const initialState = {}

export default function userReducer( state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE:
      return {...state, userProfile: action.payload };
    default: 
      return state;
  }
}