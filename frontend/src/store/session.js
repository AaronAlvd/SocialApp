
import { csrfFetch } from "./csrf";

const SIGN_UP = "session/setUser";
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

export const signUpUser = (data) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = data;

  try {
    const response = await csrfFetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data.user));
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Sign-up failed");
    }
  } catch (error) {
    console.error("Network or other error:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

export const login = (credential, password) => async (dispatch) => {
  console.log('Hello from login')
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential: credential,
      password: password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return data;
};
export const restoreUser = () => {
  return async (dispatch) => {
    {
      const response = await csrfFetch("/api/session");
      const data = await response.json();
      dispatch(setUser(data.user));
      return data;
    }
  };
};
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });

  const data = await response.json();

  dispatch(removeUser());
  return data
};
export const updateUser = (formData) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/session/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {}

    const data = await response.json();
    return data;

  } catch (error) {
    console.log(error)
  }
};
export const deleteAccount = () => async () => {
  try {
    const response = await csrfFetch('/api/session/delete', {
      method: 'DELETE',
    })
  } catch (error) {
    console.log(error)
  }
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SIGN_UP:
      return { ...state, user: action.payload, token: action.token };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};


export default sessionReducer;
