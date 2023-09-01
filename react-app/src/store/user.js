import { loadPostsThunk } from "./post";

//ACTION
const GET_USERS = "GET /users";
const GET_CURRENT = "GET /users/current";
const UPDATE_CURRENT = "PUT /users/current";
const CLEAR_USER = "CLEAR";
const ADD_FOLLOWING = "POST /users/:userId/following";
const REMOVE_FOLLOWING = "DELETE /users/:userId/following";

//ACTION CREATOR
export function loadUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

export function loadSingleUser(user) {
  return {
    type: GET_CURRENT,
    user,
  };
}

export function clearSingleUser() {
  return {
    type: CLEAR_USER,
  };
}

export function updateUser(user, userId) {
  return {
    type: UPDATE_CURRENT,
    user,
    userId,
  };
}

export function addFollowing(currentUser, targetUser) {
  return {
    type: ADD_FOLLOWING,
    currentUser,
    targetUser,
  };
}

export function removeFollowing(currentUser, targetUser) {
  return {
    type: REMOVE_FOLLOWING,
    currentUser,
    targetUser,
  };
}
//ACTION THUNK
export const getInitialStateThunk = (userId) => async (dispatch) => {
  if (userId) {
    const response = await fetch(`/api/posts/initialState/${userId}`);
    const data = await response.json();
    // console.log(data.Response.users);
    dispatch(loadUsers(data.Response.users));
    dispatch(loadPostsThunk(data.Response.posts));
    dispatch(loadSingleUser(data.Response.singleUser));
    return { Message: "Data loaded" };
  } else {
    const response = await fetch(`/api/posts/initialState/${0}`);
    const data = await response.json();
    dispatch(loadUsers(data.Response.users));
    dispatch(loadPostsThunk(data.Response.posts));
    dispatch(clearSingleUser());
    return { Message: "Data loaded" };
  }
};

export const clearSingleUserThunk = () => async (dispatch) => {
  dispatch(clearSingleUser());
};

export const addFollowingThunk =
  (currentUser, targetUser) => async (dispatch) => {
    // delete targetUser.posts;
    const response = await fetch(
      `/api/users/${currentUser.id}/following/${targetUser.id}`,
      {
        method: "POST",
        body: JSON.stringify({
          currentUser,
          targetUser,
        }),
      }
    );
    console.log(response);
    if (response.ok) {
      dispatch(addFollowing(currentUser, targetUser));
    }
  };

export const removeFollowingThunk =
  (currentUser, targetUser) => async (dispatch) => {
    // delete targetUser.posts;
    const response = await fetch(
      `/api/users/${currentUser.id}/following/${targetUser.id}`,
      { method: "DELETE" }
    );
    if (response.ok) {
      dispatch(removeFollowing(currentUser, targetUser));
    }
  };

export const getUsersThunk = () => async (dispatch) => {
  const response = await fetch("/api/users");

  if (response.ok) {
    const users = await response.json();
    dispatch(loadUsers(users));
  }
};

export const getCurrentUserDetailsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/details/${id}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(loadSingleUser(user));
  }
};

export const updateCurrentUserThunk = (user, userId) => async (dispatch) => {
  const response = await fetch(`/api/users/current`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const user = await response.json();
    dispatch(updateUser(user, userId));
    return response;
  }
};

const initialState = {
  users: {},
  singleUser: {},
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      const users = action.users.users;
      let newState = { ...state };
      users.forEach((user) => (newState.users[user.id] = user));
      return newState;
    }
    case GET_CURRENT: {
      const newState = { ...state };
      newState.singleUser = action.user;
      return newState;
    }
    case CLEAR_USER: {
      const newState = { ...state };
      newState.singleUser = {};
      return newState;
    }
    case UPDATE_CURRENT: {
      const newState = { ...state };
      newState.singleUser = action.user;
      return newState;
    }
    case ADD_FOLLOWING: {
      let newState = { ...state };
      newState.singleUser.userFollowing.push(action.targetUser);
      return newState;
    }
    case REMOVE_FOLLOWING: {
      let newState = { ...state };
      let followers = newState.singleUser.userFollowing;
      let newFollowers = followers.filter(
        (follower) => follower.id != action.targetUser.id
      );
      newState.singleUser.userFollowing = newFollowers;
      return newState;
    }
    default:
      return state;
  }
};

export default usersReducer;
