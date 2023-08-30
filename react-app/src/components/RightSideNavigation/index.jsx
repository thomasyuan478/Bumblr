import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
import "./index.css";

export function RightSideNavigation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isArrowDirection, setIsArrowDirection] = useState('down');

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setIsOpen(!isOpen);
  };

  const accountDropdown = () => {
    setIsOpen(!isOpen);
    setIsArrowDirection(isArrowDirection === 'down' ? 'up' : 'down');
  }

  return (
    <div>
      {user && (
      <div>
        <div className="right-side-nav-home" onClick={() => history.push("/")}>
          <img style={{filter: 'brightness(0) invert(1)'}} src={home} alt="" /> Home
        </div>
        <div
          className="right-side-nav-coming-soon"n
          onClick={() => alert("Feature coming soon!")}
        >
          <img style={{filter: 'brightness(0) invert(1)'}} src={explore} alt="" /> Explore
        </div>
        <div
          className="right-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img style={{filter: 'brightness(0) invert(1)'}} src={video} alt="" /> <p>Live</p>
        </div>
        <div
          className="right-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img style={{filter: 'brightness(0) invert(1)'}} src={bolt} alt="" /> <p>Activity</p>
        </div>
        <div
          className="right-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img style={{filter: 'brightness(0) invert(1)'}} src={chat} alt="" /> <p>Messages</p>
        </div>
        <div
          className="right-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img style={{filter: 'brightness(0) invert(1)'}} src={mail} alt="" /> <p>Inbox</p>
        </div>
        <div className="right-side-nav-account" onClick={accountDropdown}>
          <div className="right-side-nav-account-arrow-seperator">
            <img style={{filter: 'brightness(0) invert(1)'}} src={account} alt="" /> <p>Account</p>
          </div>
          <i className={`nav-account-arrow ${isArrowDirection}`}/>
        </div>
        {isOpen && (
        <div className='left-side-nav-drop-down'>
            <hr />
            <div>
            <p style={{color: 'white'}}>Likes</p>
            <p style={{color: 'white'}}>Following</p>
            <p style={{color: 'white'}}>Followers</p>
            <p style={{color: 'white'}} onClick={handleLogout}>Logout</p>
            </div>
            <hr />
            <div className="right-side-nav-account-user" style={{display: 'flex', gap: '6px'}}>
            <img className="right-side-nav-current-user-pfp" src={user.profilePic} alt="avatar" />
            <div style={{fontSize: '25px', paddingTop: '0', color: 'white'}}>{user.username}</div>
            <div style={{fontSize: '25px', paddingTop: '0', color: 'white'}}>{user.nickname}</div>
            </div>
        </div>)}
        <div
          className="right-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img style={{filter: 'brightness(0) invert(1)'}} src={settings} alt="" /> <p>Settings</p>
        </div>
        <div
          className="right-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img style={{filter: 'brightness(0) invert(1)'}} src={store} alt="" /> <p>BumblrMart</p>
        </div>
        <div
          className="right-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img style={{filter: 'brightness(0) invert(1)'}} src={star} alt="" /> <p>Go Ad-Free</p>
        </div>
      </div>)}
    </div>
  );
}

export default RightSideNavigation;