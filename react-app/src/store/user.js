//ACTION
const GET_USERS = "GET /users";
const GET_CURRENT = "GET /users/current";
const UPDATE_CURRENT = "PUT /users/current";

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

export function updateUser(user, userId) {
  return {
    type: UPDATE_CURRENT,
    user,
    userId,
  };
}
//ACTION THUNK
export const getUsersThunk = () => async (dispatch) => {
  const response = await fetch("/api/users");

  if (response.ok) {
    const users = await response.json();
    dispatch(loadUsers(users));
  }
};

export const getCurrentUserThunk = () => async (dispatch) => {
  const response = await fetch("/api/users/current");

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
    dispatch(updatePost(user, userId));
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
      const users = action.users;
      let newState = { ...state };
      users.forEach((user) => (newState.users[user.id] = user));
      return newState;
    }
    case GET_CURRENT: {
      const newState = { ...state };
      newState.singleUser = action.user;
      return newState;
    }
    case UPDATE_CURRENT: {
      const newState = { ...state };
      newState.singleUser = action.user;
      return newState;
    }
    default:
      return state;
  }
};

export default usersReducer;
