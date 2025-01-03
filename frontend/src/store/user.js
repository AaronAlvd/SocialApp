import { csrfFetch } from "./csrf";

const FETCH_PROFILE = 'FETCH_USER';

const setProfile = (data) => ({
  type: FETCH_PROFILE,
  action: payload,
});

export const fetchProfile = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/${id}`);

    if (!response.ok) {

    }

    const data = await response.json();
    dispatch(setProfile(data));
    
  } catch(error) {

  }
}

const initialState = {
  profile: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE: 
      return {...state, profile: action.payload};
    default:
      return state;
  }
}