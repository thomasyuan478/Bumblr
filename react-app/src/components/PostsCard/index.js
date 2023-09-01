import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import parse from "html-react-parser";
import "./PostCard.css"
import CommentBox from '../CommentBox';
import { addFollowingThunk, removeFollowingThunk } from '../../store/user';
import { addLikeThunk, deleteLikeThunk } from '../../store/post';
import OpenModalButton from '../OpenModalButton';
import DeletePostModal from '../DeletePostModal';
import LoginFormModal from '../LoginFormModal';
import { useNonClosingModal } from '../../context/NonClosingModal';
import { PostEditorContainer } from '../PostEditor';


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
  const { setModalContent } = useNonClosingModal()

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

  // FOLLOWING FUNCTIONS
  const startFollowing = (e) => {
    dispatch(addFollowingThunk(sessionUser, obj.user));
  };

  const stopFollowing = (e) => {
    dispatch(removeFollowingThunk(sessionUser, obj.user));

    closeMenu();
  };

  // LIKE FUNCTIONS
  const likeCheck = (obj, user) => {
    let userIds = [];
    let tmp = obj.likes;
    tmp.forEach((obj) => userIds.push(obj.userId));
    if (userIds.includes(user.id)) return true;
    else return false;
  };

  const removeLike = () => {
    dispatch(deleteLikeThunk(obj.id, sessionUser.id));
  };

  const addLike = () => {
    dispatch(addLikeThunk(obj.id, sessionUser.id));
  };


  const [showMenu, setShowMenu] = useState(false);
  const [showCommentsMenu, setShowCommentsMenu] = useState(false);
  const ulRef = useRef();

  // Opens Post Settings DropDown
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // Opens Comments Box DropDown
  const openCommentsMenu = () => {
    if (showCommentsMenu) return;
    setShowCommentsMenu(true);
  }

  // useEffect(() => {
  //   if (!showMenu) return;
  //   // if (!showCommentsMenu) return;

  //   const closeMenu = (e) => {
  //     if (!ulRef.current.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   };

  //   // const closeCommentsMenu = (e) => {
  //   //   if (!ulRef.current.contains(e.target)) {
  //   //     setShowCommentsMenu(false)
  //   //   }
  //   // }

  //   document.addEventListener('click', closeMenu);
  //   // document.addEventListener('click', closeCommentsMenu)

  //   return () => {
  //     document.removeEventListener("click", closeMenu);
  //     // document.removeEventListener("click", closeCommentsMenu);
  //   };
  // }, [showMenu
  //   // showCommentsMenu
  // ]);

  const closeMenu = () => setShowMenu(false);
  const closeCommentsMenu = () => setShowCommentsMenu(false);

  const ulClassName = "settings-dropdown" + (showMenu ? "" : " hidden");
  const commentsDropDown = "comments-box-dropdown" + (showCommentsMenu ? "" : " hidden");

  if (!obj) {
    return null
  }

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
          {sessionUser && followCheck(obj.user.id, sessionUser) && obj.user.id !== sessionUser.id &&
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
                    <button
                      className='post-edit-button'
                      onClick={() => setModalContent(<PostEditorContainer type="edit" user={sessionUser} post={obj} />)}
                    >
                      Edit
                    </button>
                  </li>
                  <li className='modal-button-li'>
                    <OpenModalButton
                      className='post-delete-button'
                      buttonText="Delete"
                      onButtonClick={closeMenu}
                      modalComponent={<DeletePostModal obj={obj} />}
                    />
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
        {obj.tags !== "" && obj.tags.split(", ").map((tag, i) => {
          return <span key={i}>#{tag}</span>
        })}
      </div>
      <div className='notes-container'>
        <div className='notes-dropdown-menu'>
          {!showCommentsMenu &&
            <button className='notes-button' onClick={openCommentsMenu}><span style={{ fontWeight: "bolder" }}>{obj.comments.length + obj.likes.length}</span> notes</button>
          }
          {showCommentsMenu &&
            <button className='close-notes-button' onClick={closeCommentsMenu}><span><i class="fa-solid fa-x"></i></span>Close</button>
          }
        </div>
        {/* most likely the if conditional here for if dropdown menu is closed */}
        <div className='comments-favorites-container'>
          <div className='comments-favorite-icons-container'>
            <div className='comments-icon'>
              {!showCommentsMenu &&
              <button className='posts-comments-button' onClick={openCommentsMenu}><i class="fa-regular fa-comment fa-lg"></i></button>
              }
              {showCommentsMenu &&
              <button className='posts-comments-button' onClick={closeCommentsMenu}><i class="fa-regular fa-comment fa-lg"></i></button>
              }
            </div>
            <div className='likes-icon'>
              {sessionUser && likeCheck(obj, sessionUser) &&
                <button onClick={removeLike} className='posts-likes-button'><i class="fa-solid fa-heart fa-lg" style={{ color: "red" }}></i></button>
              }
              {sessionUser && !likeCheck(obj, sessionUser) &&
                <button onClick={addLike} className='posts-likes-button'><i class="fa-regular fa-heart fa-lg"></i></button>
              }
              {!sessionUser &&
                <div className='no-user-like-button'>
                  <OpenModalButton
                    buttonText={<i class="fa-regular fa-heart fa-lg"></i>}
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />
                  {/* <button onClick={addLike} className='posts-likes-button'><i class="fa-regular fa-heart fa-lg"></i></button> */}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className='notes-comments-container'>
        <ul className={commentsDropDown} ref={ulRef}>
          <CommentBox
            obj={obj}
            id={id}
            key={id}
          />
        </ul>
      </div>
    </div>
  )
}

export default PostCard;
