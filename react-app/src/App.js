import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { getUsersThunk, getCurrentUserDetailsThunk } from "./store/user";
import { getPostsThunk, updatePostThunk } from "./store/post";
import { PostTest } from "./components/PostTest";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // useEffect(() => {
  //   if (user) dispatch(getCurrentUserDetailsThunk(user.id));
  // }, [user]);

  // useEffect(() => {
  //   dispatch(getUsersThunk());
  // }, [dispatch]);

  // TEST FEED OBJECT ***********
  // useEffect(() => {
  //   dispatch(getPostsThunk());
  // }, [dispatch]);

  // const postsBigObj = useSelector((state) => state.posts);

  // const postsKey = Object.keys(postsBigObj.posts);
  // const postsObj = postsBigObj.posts;
  // **********************************

  {
  }
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* Comment this in for a test feed */}
      {/* {postsKey.map((key) => (
        <PostTest
          obj={postsObj[key]}
          id={postsObj[key].id}
          key={postsObj[key].id}
        />
      ))} */}
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
