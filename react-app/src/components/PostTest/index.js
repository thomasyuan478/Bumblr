import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  deletePostThunk,
  getPostsThunk,
  updatePostThunk,
} from "../../store/post";
import { deleteNoteThunk } from "../../store/note";
import parse from "html-react-parser";
import "./PostTest.css";
import PostCard from "../PostsCard";
import CommentBox from "../CommentBox";

// { obj, id }
export const PostTest = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  const postsBigObj = useSelector((state) => state.posts);

  const postsKey = Object.keys(postsBigObj.posts);
  const postsObj = postsBigObj.posts;

  const allPosts = useSelector((state) => state.posts.posts);
  // console.log('all posts here', allPosts)
  const posts = Object.values(allPosts);
  // console.log('all posts keys array', posts)

  // const state = useSelector((state) => state.posts.posts[id]);
  // const posts = Object.values(state)
  // let commentObjs;
  // if (state) commentObjs = state.comments;

  // const deleteButton = (e) => {
  //   dispatch(deletePostThunk(state.id));
  //   // commentObjs.forEach((obj) => console.log(obj.comment));
  //   // console.log(commentObjs);
  // };

  // const click = (e) => {
  //   dispatch(updatePostThunk({}, state.id));
  // };

  // if (!allPosts) return null;

  return (
    <>
    <CommentBox />
      <div className='post-card-container'>
        {postsKey.map(key => (
          <PostCard
            obj={postsObj[key]}
            id={postsObj[key].id}
            key={postsObj[key].id}
          />
        ))}
      </div>
    </>
    // <>
    //   <div>
    //     <div> {state.id} </div>
    //     <div>{state.content}</div>
    //     <button onClick={deleteButton}>Delete</button>
    //     <button onClick={click}> Simulate Update</button>
    //     <div>
    //       <ul>
    //         {commentObjs.map((obj) => (
    //           <li key={obj.id}>
    //             {obj.comment}
    //             <button
    //               onClick={(e) => {
    //                 dispatch(deleteNoteThunk(obj.id, state.id));
    //               }}
    //             >
    //               Delete {obj.id}
    //             </button>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </>
  );
};
