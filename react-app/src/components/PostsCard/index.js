import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import parse from "html-react-parser";
import "./PostCard.css"
import CommentBox from '../CommentBox';
import { addFollowingThunk, removeFollowingThunk } from '../../store/user';

const PostCard = ({ obj, id }) => {
  const dispatch = useDispatch()
  // console.log('obj here ------', obj)
  // console.log('id -----', id)

  // console.log('tags here -----', obj.tags)
  // const addHashTag = (str) => {
  //   if (str) {
  //     strArray = str.split(", ");
  //     return strArray.map(string => "#" + string);
  //   }
  //   else return
  // }
  const sessionUser = useSelector(state => state.session.user)
  const userInfo = useSelector(state => state.users.singleUser)
  // console.log('session use rhere-----', sessionUser)
  // console.log('single user info-----', userInfo)

  let normalizedData = {};
  let followingIds;
  if (sessionUser && Object.keys(userInfo).length != 0) {
    let followingArray = userInfo.userFollowing;
    followingArray.forEach((obj) => (normalizedData[obj.id] = obj));
    // console.log(userCheck(), normalizedData);
    followingIds = Object.keys(normalizedData);
    // console.log(followingIds, typeof String(state.id));
  }
  const followCheck = (id, user) => {
    if (user && Object.keys(userInfo).length != 0) {
      if (followingIds.includes(String(id))) return false;
      else return true;
    }
  };

  const startFollowing = (e) => {
    dispatch(addFollowingThunk(sessionUser, obj.user));
  };

  const stopFollowing = (e) => {
    dispatch(removeFollowingThunk(sessionUser, obj.user));
  };

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const ulClassName = "settings-dropdown" + (showMenu ? "" : " hidden");


  return (
    <div className='postcards'>
      <div className='user-header-details-container'>
        <div className='user-header-details'>
          <div className='user-profile-picture'>
            <img className='user-profile-image' src={obj.user.profilePic}></img>
          </div>
          <div className='user-username'>
            {obj.user.username}
          </div>
          {sessionUser && followCheck(obj.user.id, sessionUser) &&
            <div className='user-follow-button'>
              <button className='posts-follow-button' onClick={startFollowing}>Follow</button>
            </div>
          }
        </div>
        <div className='post-settings-dropdown'>
          {/* Conditional here for if user is owner of post to allow delete and update post */}
          <button className='post-settings-button' onClick={openMenu}><i class="fa-solid fa-ellipsis"></i></button>
          <ul className={ulClassName} ref={ulRef}>
            <>
              <div className='post-setting-dropdown-container'>
                <li className='post-created-at'>
                  {obj.createdAt}
                </li>
              </div>
              {sessionUser && sessionUser.id === obj.user.id &&
                <>
                  <li>
                    <button className='post-edit-button'>Edit</button>
                  </li>
                  <li>
                    <button className='post-delete-button'>Delete</button>
                  </li>
                </>
              }
              {sessionUser && !followCheck(obj.user.id, sessionUser) &&
                <li>
                  <button className='post-edit-button' onClick={stopFollowing}>Unfollow</button>
                </li>
              }
              <li>
                <button className='close-post-settings-button' onClick={closeMenu}>Close</button>
              </li>
            </>
          </ul>
        </div>
      </div>
      <div className='post-content'>
        {parse(obj.content)}
      </div>
      <div className='post-tags-container'>
        {obj.tags !== "" && obj.tags.split(", ").map(string => "#" + string).join(' ')}
      </div>
      <div className='notes-container'>
        <div className='notes-dropdown-menu'>
          <button className='notes-button'><span style={{ fontWeight: "bolder" }}>{obj.comments.length + obj.likes.length}</span> notes</button>
        </div>
        {/* most likely the if conditional here for if dropdown menu is closed */}
        <div className='comments-favorites-container'>
          <div className='comments-favorite-icons-container'>
            <div className='comments-icon'>
              <button className='posts-comments-button'><i class="fa-regular fa-comment fa-lg"></i></button>
            </div>
            <div className='likes-icon'>
              <button className='posts-likes-button'><i class="fa-regular fa-heart fa-lg"></i></button>
            </div>
          </div>
          <div className='notes-comments-container'>
            <CommentBox
            obj={obj}
            key={id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard;
