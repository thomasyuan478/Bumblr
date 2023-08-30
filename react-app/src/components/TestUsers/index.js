import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { deletePostThunk, updatePostThunk } from "../../store/post";
import { deleteNoteThunk } from "../../store/note";
import parse from "html-react-parser";
import { addFollowingThunk, removeFollowingThunk } from "../../store/user";

export const TestUsers = ({ obj, id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const state = useSelector((state) => state.users.users[id]);
  // const currentUser = useSelector((state) => state.singleUser);
  // let commentObjs;
  const user = useSelector((state) => state.session.user);
  // if (state) commentObjs = state.comments;
  const usersObj = useSelector((state) => state.users);
  const currentUser = usersObj.singleUser;

  // const deleteButton = (e) => {
  //   dispatch(deletePostThunk(state.id));
  //   // commentObjs.forEach((obj) => console.log(obj.comment));
  //   // console.log(commentObjs);
  // };

  // const click = (e) => {
  //   dispatch(updatePostThunk({}, state.id));
  // };

  if (!state) return null;

  // console.log(user);

  let normalizedData = {};
  let followingIds;
  if (user && Object.keys(currentUser).length != 0) {
    let followingArray = currentUser.userFollowing;
    followingArray.forEach((obj) => (normalizedData[obj.id] = obj));
    // console.log(userCheck(), normalizedData);
    followingIds = Object.keys(normalizedData);
    // console.log(followingIds, typeof String(state.id));
  }
  const userCheck = (id, user) => {
    if (user && Object.keys(currentUser).length != 0) {
      if (followingIds.includes(String(id))) return false;
      else return true;
    }
  };

  //6, 7, 9, 11
  // console.log(Object.keys(currentUser).length);
  if (user?.id) if (user.id === state.id) return null;

  const startFollowing = (e) => {
    dispatch(addFollowingThunk(currentUser, state));
  };

  const stopFollowing = (e) => {
    dispatch(removeFollowingThunk(currentUser, state));
  };

  return (
    <>
      <div className="post_card">
        <div>
          {" "}
          {state.username}{" "}
          {user && userCheck(state.id, user) && (
            <button onClick={startFollowing}>Follow</button>
          )}{" "}
          {user && !userCheck(state.id, user) && (
            <button onClick={stopFollowing}>Unfollow</button>
          )}
        </div>
        {/* <div>{parse(state.content)}</div> */}

        {/* {!userCheck() && <p>Already Following</p>} */}
        {/* <button onClick={click}> Simulate Update</button> */}
        {/* <div>{currentUser.userFollowing}</div> */}
        <div>
          <ul>
            {/* {commentObjs.map((obj) => (
              <li key={obj.id}>
                {obj.comment}
                <button
                  onClick={(e) => {
                    dispatch(deleteNoteThunk(obj.id, state.id));
                  }}
                >
                  Delete {obj.id}
                </button>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </>
  );
};
