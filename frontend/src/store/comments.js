import { csrfFetch } from './csrf';
import { removeComment, setComments, setComment } from './post';


export const deleteComment = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {

    }

    const data = await response.json();
    return data;

  } catch (error) {
    
  }
}
export const addComment = async (data) => {
  try {
    const response = await csrfFetch(`/api/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment: data.text,
        postId: data.post_id
      })
    });

    if (!response.ok) {

    }

    const results = await response.json();
    dispatch(setComment(data));
    return results;
  } catch(error) {

  }
}
export const fetchComments = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/posts/comments/${id}`);

    if (!response) {

    }

    const data = await response.json();
    dispatch(setComments(data))
    return data;
  } catch(error) {

  }
}




