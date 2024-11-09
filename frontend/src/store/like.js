import { csrfFetch } from "./csrf"

export const likePost = (data) => async () => {
  const response = await csrfFetch('/api/likes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      postId: data.postId,
      commentId: data.commentId,
    })
  });

  const result = await response.json();

  return result;
};

export const unlikePost = (data) => async () => {
  const response = await csrfFetch('/api/likes', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      postId: data.postId,
      commentId: data.commentId,
    })
  });

  const result = await response.json();
  
  return result;
};