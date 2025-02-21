import { csrfFetch } from './csrf';

const ADD_MESSAGE = 'ADD_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const FETCH_MESSAGES = 'FETCH_MESSAGES';
const FETCH_CHATS = 'FETCH_CHATS';

const addMessage = (data) => ({
  type: ADD_MESSAGE,
  payload: data,
});
const deleteMessage = (id) => ({
  type: DELETE_MESSAGE,
  payload: id,
});
const setMessages = (data) => ({
  type: FETCH_MESSAGES,
  payload: data,
});
const setChats = (data) => ({
  type: FETCH_CHATS,
  payload: data,
})

export const fetchChats = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/messages/');

    const data = await response.json();
    dispatch(setChats(data))

  } catch (error) {

  }
}
export const sendMessage = async (obj) => {
  try {
    console.log(typeof obj.userId)
    const response = await csrfFetch(`/api/messages/${obj.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: obj.content
      })
    })
    if (!response.ok) {}
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
export const fetchChat = (userId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/messages/${userId}`)
    if (!response.ok){}
    const data = await response.json()
    dispatch(setMessages(data))
    return data
  } catch (error) {
    console.log(error)
  }
}
export const removeMessage = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/messages/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok){}

    const data = await response.json()

    return data
    
  } catch (error) {
    console.log(error)
  }
}

const initialState = {
  messages: null,
  chats: null,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
          ...state,
          messages: [...state.messages, action.payload],
      };
    case DELETE_MESSAGE:
      return {
          ...state,
          messages: state.messages.filter((message) => message.id !== action.payload),
      };
    case FETCH_MESSAGES:
      return {
          ...state,
          messages: action.payload,
      };
      case FETCH_CHATS:
      return {
          ...state,
          chats: action.payload,
      };
    default:
      return state;
  }
};

export default messagesReducer;
