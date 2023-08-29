import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { getUsersThunk, getCurrentUserDetailsThunk } from "./store/user";
import { getPostsThunk } from "./store/post";
import ProtectedRoute from "./components/auth/ProtectedRoute"
import {PostEditorContainer} from "./components/PostEditor"
import { NewPost } from "./components/NewPost";
import { LeftSideNavigation } from './components/LeftSideNavigation'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (user) dispatch(getCurrentUserDetailsThunk(user.id));
  }, [user]);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPostsThunk());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <NewPost />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <LeftSideNavigation />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
