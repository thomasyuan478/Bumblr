import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { deleteCommentThunk, deletePostThunk } from "../../store/post";

export const PostTest = ({ obj, id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const state = useSelector((state) => state.posts.posts[id]);
  const commentObjs = useSelector((state) => state.posts.posts[id].comments);

  const deleteButton = (e) => {
    // dispatch(deletePostThunk(state.id));
    commentObjs.forEach((obj) => console.log(obj.comment));
    console.log(commentObjs);
  };

  if (!state) return null;

  return (
    <>
      <div>
        <div> {state.id} </div>
        <div>{state.content}</div>
        <button onClick={deleteButton}>Delete</button>
        <div>
          <ul>
            {commentObjs.map((obj) => (
              <li>
                {obj.comment}
                <button
                  onClick={(e) => {
                    dispatch(deleteCommentThunk(obj.id, state.id));
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
