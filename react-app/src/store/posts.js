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

export function deletePost(post) {
  return {
    type: DELETE_POST,
    post,
  };
}
