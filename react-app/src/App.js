import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import {
  getUsersThunk,
  getCurrentUserDetailsThunk,
  clearSingleUserThunk,
} from "./store/user";
import { getPostsThunk, updatePostThunk } from "./store/post";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { PostEditorContainer } from "./components/PostEditor";
import { NewPost } from "./components/NewPost";
import { PostTest } from "./components/LikesTest";
import { getNotesThunk } from "./store/note";
import { MainPageNavigation } from "./components/MainPageNavigation";
import { LeftSideNavigation } from "./components/LeftSideNavigation";
import { AccountSetting } from "./components/AccountSetting";
import { TestUsers } from "./components/TestUsers";
import { LikesTest } from "./components/LikesTest";
import { getInitialStateThunk } from "./store/user";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts);
  
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // useEffect(() => {
  //   if (user) dispatch(getCurrentUserDetailsThunk(user.id));
  //   // if (!user) dispatch(clearSingleUserThunk());
  // }, [user]);

  useEffect(() => {
    if (isLoaded) dispatch(getInitialStateThunk(user?.id));
  }, [dispatch, user, isLoaded]);

  // useEffect(() => {
  //   dispatch(getUsersThunk());
  // }, [dispatch]);

  const usersBigObj = useSelector((state) => state.users);
  const usersKey = Object.keys(usersBigObj.users);
  const usersObj = usersBigObj.users;

  // useEffect(() => {
  //   dispatch(getNotesThunk());
  // }, [dispatch]);

  // TEST FEED OBJECT ***********
  // useEffect(() => {
  //   dispatch(getPostsThunk());
  // }, [dispatch]);

  const postsBigObj = useSelector((state) => state.posts);

  const postsKey = Object.keys(postsBigObj.posts);
  const postsObj = postsBigObj.posts;
  // **********************************

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <NewPost />
      {/* Comment this in for a test feed */}
      <div className="card_container">
        {postsKey.map((key) => (
          <LikesTest
            obj={postsObj[key]}
            id={postsObj[key].id}
            key={postsObj[key].id}
          />
        ))}
        {usersKey.map((key) => (
          <TestUsers
            obj={usersObj[key]}
            id={usersObj[key].id}
            key={usersObj[key].id}
          />
        ))}
      </div>
      {isLoaded && (
        <Switch>
          <Route path="/test">
            <AccountSetting />
          </Route>
          <Route exact path="/">
            <PostTest />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/testnavigation">
            <MainPageNavigation />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
