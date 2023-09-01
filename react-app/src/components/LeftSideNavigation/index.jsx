import React, { useState } from 'react';
import { useHistory, NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import home from "../../nav-icons/home.png";
import settings from "../../nav-icons/settings.png";
import bolt from "../../nav-icons/bolt.png";
import chat from "../../nav-icons/chat.png";
import explore from "../../nav-icons/explore.png";
import mail from "../../nav-icons/mail.png";
import account from "../../nav-icons/account.png";
import "./index.css";
import { useNonClosingModal } from '../../context/NonClosingModal';
import LogOutModal from '../LogOutModal';

export function LeftSideNavigation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userInfo = useSelector(state => state.users.singleUser)
  const [isOpen, setIsOpen] = useState(false);
  const [isArrowDirection, setIsArrowDirection] = useState('up');

  const { setModalContent } = useNonClosingModal()

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setIsOpen(!isOpen);
  };

  const accountDropdown = () => {
    setIsOpen(!isOpen);
    setIsArrowDirection(isArrowDirection === 'up' ? 'down' : 'up');
  }

  return (
    <div id='left-side-nav-container'>
      {user && (
        <div className="left-side-nav">
          <div className="left-side-nav-title">
            <h1 className="left-side-nav-title-hover">Bumblr</h1>
          </div>
          <div className="left-side-nav-home" onClick={() => history.push("/")}>
            <img style={{ filter: 'brightness(0) invert(1)' }} src={home} alt="" /> Home
          </div>
          <div
            className="left-side-nav-coming-soon"
            onClick={() => alert("Feature coming soon!")}
          >
            <img style={{ filter: 'brightness(0) invert(1)' }} src={explore} alt="" /> Explore
          </div>
          {/* <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img style={{filter: 'brightness(0) invert(1)'}} src={video} alt="" /> <p>Live</p>
        </div> */}
          {/* <div
            className="left-side-nav-coming-soon"
            onClick={() => alert("Feature coming soon!")}
          >
            <img style={{ filter: 'brightness(0) invert(1)' }} src={bolt} alt="" /> <p>Activity</p>
          </div> */}
          <div
            className="left-side-nav-coming-soon"
            onClick={() => alert("Feature coming soon!")}
          >
            <img style={{ filter: 'brightness(0) invert(1)' }} src={chat} alt="" /> <p>Messages</p>
          </div>
          <div
            className="left-side-nav-coming-soon"
            onClick={() => alert("Feature coming soon!")}
          >
            <img style={{ filter: 'brightness(0) invert(1)' }} src={mail} alt="" /> <p>Inbox</p>
          </div>
          <div className="left-side-nav-account" onClick={accountDropdown}>
            <div className="left-side-nav-account-arrow-seperator">
              <img style={{ filter: 'brightness(0) invert(1)' }} src={account} alt="" /> <p>Account</p>
            </div>
            <i className={`nav-account-arrow ${isArrowDirection}`} />
          </div>
          {isOpen && (
            <div className='left-side-nav-drop-down'>
              <hr />
              <div className='dropdown-navlinks'>
                <div className='likes-info-container'>
                  <p style={{ color: 'white', margin: "0px", padding: "10px 0px" }}>Likes</p>
                  <span>{userInfo.likes.length}</span>
                </div>
                <NavLink to="/following" className='follow-info-container'>
                  <p style={{ color: 'white', margin: "0px" }}><span>Following</span></p>
                  <span className='follow-counter'>{userInfo.userFollowing.length}</span>
                </NavLink>
                <NavLink to="/follower" className='follow-info-container'>
                  <p style={{ color: 'white', margin: "0px" }}><span>Followers</span></p>
                  <span className='follow-counter'>{userInfo.userFollowers.length}</span>
                </NavLink>

                <NavLink
                  to="/test"
                  className="left-side-nav-settings"
                >
                  <img style={{ filter: 'brightness(0) invert(1)' }} src={settings} alt="" /> <p>Settings</p>
                </NavLink>
                <p id='dropdown-logout' onClick={() => setModalContent(<LogOutModal />)}>Logout</p>
              </div>
              <hr />
              <div className="left-side-nav-account-user" style={{ display: 'flex', gap: '6px' }}>
                <img className="left-side-nav-current-user-pfp" src={user.profilePic} alt="avatar" />
                <div style={{ fontSize: '25px', paddingTop: '0', color: 'white' }}>{user.username}</div>
                <div style={{ fontSize: '25px', paddingTop: '0', color: 'white' }}>{user.nickname}</div>
              </div>
            </div>)}

          {/* <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img style={{filter: 'brightness(0) invert(1)'}} src={store} alt="" /> <p>BumblrMart</p>
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img style={{filter: 'brightness(0) invert(1)'}} src={star} alt="" /> <p>Go Ad-Free</p>
        </div> */}
        </div>)}
    </div>
  );
}

export default LeftSideNavigation;
