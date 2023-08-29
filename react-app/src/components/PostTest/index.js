import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { deletePostThunk, updatePostThunk } from "../../store/post";

export const PostTest = ({ obj, id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  return (
    <>
      <div>
        <div> {state.id} </div>
        <div>{state.content}</div>
        <button onClick={deleteButton}>Delete</button>
        <button onClick={click}> Simulate Update</button>
        <div>
          <ul>
            {commentObjs.map((obj) => (
              <li key={obj.id}>
                {obj.comment}
                <button
                  onClick={(e) => {
                    console.log(obj.id, state.id);
                  }}
                >
                  {obj.id}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
