import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostTest } from "../PostTest";
import { getPostsThunk } from "../../store/post";
import './index.css'

export function FeedNavigation() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  const postsBigObj = useSelector((state) => state.posts);

  const postsKey = Object.keys(postsBigObj.posts);
  const postsObj = postsBigObj.posts;
  return (
    <div className='feed-navigation'>
      {postsKey.map((key) => (
        <PostTest
          obj={postsObj[key]}
          id={postsObj[key].id}
          key={postsObj[key].id}
        />
      ))}
    </div>
);
}

export default FeedNavigation;