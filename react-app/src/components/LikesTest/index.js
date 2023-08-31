import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  addLikeThunk,
  deleteLikeThunk,
  deletePostThunk,
  updatePostThunk,
} from "../../store/post";
import { deleteNoteThunk } from "../../store/note";
import parse from "html-react-parser";
import "./LikesTest.css";

export const LikesTest = ({ obj, id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const state = useSelector((state) => state.posts.posts[id]);
  let commentObjs;
  if (state) commentObjs = state.comments;

  const deleteButton = (e) => {
    dispatch(deletePostThunk(state.id));
    // commentObjs.forEach((obj) => console.log(obj.comment));
    // console.log(commentObjs);
  };

  const click = (e) => {
    dispatch(updatePostThunk({}, state.id));
  };

  if (!state) return null;

  const total = (obj) => {
    let likes = Object.keys(obj.likes).length;
    let comments = Object.keys(obj.comments).length;
    return likes + comments;
  };

  const likeCheck = (obj, user) => {
    let userIds = [];
    let tmp = obj.likes;
    tmp.forEach((obj) => userIds.push(obj.userId));
    if (userIds.includes(user.id)) return true;
    else return false;
  };

  // console.log(state.likes);
  // console.log(user.id);
  // console.log(userIds);

  const removeLike = () => {
    dispatch(deleteLikeThunk(state.id, user.id));
  };

  const addLike = () => {
    dispatch(addLikeThunk(state.id, user.id));
  };

  return (
    <>
      <div className="post_card">
        <div>
          {" "}
          {state.user.username} POSTID: {state.id}
        </div>
        <div>{parse(state.content)}</div>
        TotalLikes = {total(state)}
        {user && likeCheck(state, user) && (
          <button onClick={removeLike}>Unlike</button>
        )}
        {user && !likeCheck(state, user) && (
          <button onClick={addLike}>Like</button>
        )}
        <button onClick={deleteButton}>Delete</button>
        <button onClick={click}> Simulate Update</button>
        <div>
          <ul>
            {commentObjs.map((obj) => (
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
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
