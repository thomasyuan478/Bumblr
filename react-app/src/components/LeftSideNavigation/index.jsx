import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";

import home from "../../nav-icons/home.png";
import settings from "../../nav-icons/settings.png";
import bolt from "../../nav-icons/bolt.png";
import chat from "../../nav-icons/chat.png";
import explore from "../../nav-icons/explore.png";
import store from "../../nav-icons/store.png";
import video from "../../nav-icons/video.png";
import star from "../../nav-icons/star.png";
import mail from "../../nav-icons/mail.png";
import account from "../../nav-icons/account.png";
import arrow from "../../nav-icons/arrow.png";
import "./index.css";

export function LeftSideNavigation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setIsOpen(!isOpen);
  };

  const accountDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="entire-page">
      <div className="feed-page">
        <div>hello</div>
      </div>
      <div className="left-side-nav-page">
        <div className="left-side-nav-home" onClick={() => history.push("/")}>
          <img src={home} alt="" /> Home
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={explore} alt="" /> Explore
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={video} alt="" /> <p>Live</p>
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={bolt} alt="" /> <p>Activity</p>
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={chat} alt="" /> <p>Messages</p>
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={mail} alt="" /> <p>Inbox</p>
        </div>
        <div className="left-side-nav-account" onClick={accountDropdown}>
          <div className="left-side-nav-account-arrow-seperator">
            <img src={account} alt="" /> <p>Account</p>
          </div>
          <img src={arrow} alt="" className="left-side-nav-arrow-img"/>
        </div>
        {isOpen && (
        <div className='left-side-nav-drop-down'>
            <p>Likes</p>
            <p>Following</p>
            <p>Followers</p>
            <p onClick={handleLogout}>Logout</p>
        </div>)}
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={settings} alt="" /> <p>Settings</p>
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={store} alt="" /> <p>BumblrMart</p>
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={star} alt="" /> <p>Go Ad-Free</p>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default LeftSideNavigation;
