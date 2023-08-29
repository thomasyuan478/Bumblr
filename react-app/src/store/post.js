//TYPES
const CREATE_POST = "POST /api/posts";
const GET_POSTS = "GET /api/posts";
// const POST_DETAIL = "GET /api/posts/:postId"
const UPDATE_POST = "PUT /api/posts/:postId";
const DELETE_POST = "DELETE /api/posts/:postId";

//Action Creators
export function createPost(post) {
  return {
    type: CREATE_POST,
    post,
  };
}

export function loadPosts(posts) {
  return {
    type: GET_POSTS,
    posts,
  };
}

export function updatePost(post, postId) {
  return {
    type: UPDATE_POST,
    post,
    postId,
  };
}

export function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId,
  };
}

//thunk Action Creator
export const postPostThunk = (post) => async (dispatch) => {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
};

export const getPostsThunk = () => async (dispatch) => {
  const response = await fetch("/api/posts");

  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
  }
};

export const updatePostThunk = (post, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });

  if (response.ok) {
    const resPost = await response.json();
    dispatch(updatePost(resPost, postId));
    return response;
  }
};

export const deletePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  dispatch(deletePost(postId));
  return response;
};

const initialState = {
  posts: {},
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST: {
      const newState = { ...state };
      newState[action.post.id] = action.post;
      return newState;
    }
    case GET_POSTS: {
      const postsArray = action.posts.posts;
      let newState = { ...state };
      postsArray.forEach((post) => (newState.posts[post.id] = post));
      return newState;
    }
    case UPDATE_POST: {
      const newState = { ...state };
      newState.posts[action.postId] = action.post.post;
      return newState;
    }
    case DELETE_POST: {
      const newState = { ...state };
      delete newState.posts[action.postId];
      return newState;
    }
    default:
      return state;
  }
};

export default postsReducer;
