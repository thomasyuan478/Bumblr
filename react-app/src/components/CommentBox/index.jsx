import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { TiCancel } from "react-icons/ti";
import { addFollowingThunk } from "../../store/user";
import { removeFollowingThunk } from "../../store/user";
import { deleteNoteThunk } from "../../store/note";
import "./index.css";
import { addCommentThunk } from "../../store/post";
import { updateNotesThunk } from "../../store/note";
import OpenModalButton from "../OpenModalButton";
import DeleteNoteModal from "../DeleteNoteModal";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import Comments from "../Comments";

function CommentBox({ obj, id }) {
  const dispatch = useDispatch();
  const commentOwners = useSelector((state) => state.users.users);
  // console.log('commentowners', commentOwners)
  // console.log('likes', obj.likes)
  const user = useSelector((state) => state.session.user);
  const [comment, setComment] = useState("");
  const [isCommentsOpen, setIsCommentsOpen] = useState(true);
  const [isLikesOpen, setIsLikesOpen] = useState(false);
  const [editComment, setEditComment] = useState("");
  // console.log('comments array', obj)

  const userInfo = useSelector((state) => state.users.singleUser);
  // console.log('session use rhere-----', user)
  // console.log('single user info-----', userInfo)

  let normalizedData = {};
  let followingIds;
  if (user && Object.keys(userInfo).length != 0) {
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
    dispatch(addFollowingThunk(user, obj.user));
  };

  const stopFollowing = (e) => {
    dispatch(removeFollowingThunk(user, obj.user));
  };

  const commentsBoxDisplay = () => {
    if (isCommentsOpen === true) {
      return;
    }
    setIsCommentsOpen(!isCommentsOpen);
    setIsLikesOpen(!setIsLikesOpen);
  };

  const likesBoxDisplay = () => {
    if (isLikesOpen === true) {
      return;
    }
    setIsLikesOpen(!isLikesOpen);
    setIsCommentsOpen(!isCommentsOpen);
  };

  //preventing using Enter button func

  const textAreaEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const likeChecks = (obj) => {
    let userIds = [];
    let tmp = obj.likes;
    tmp.forEach((obj) => userIds.push(obj.userId));
    return userIds;
  };

  const likesArr = likeChecks(obj);
  // console.log('likes array', likesArr)
  const usersLikes = [];
  Object.values(commentOwners).forEach((user) => {
    if (likesArr.includes(user.id)) {
      usersLikes.push(user);
    }
  });
  // console.log('usersLikes', usersLikes)

  const handleSubmit = (e) => {
    e.preventDefault();

    const createComment = {
      user_id: user.id,
      post_id: obj.id,
      comment,
    };

    dispatch(addCommentThunk(createComment, user.id));

    setComment("");
  };

  const lengthCheck = () => {
    if (comment.length === 0) return true;
    else return false;
  };

  // Chronological Comments
  let comments = obj.comments;
  let normalizedComments = {};
  comments.forEach((comment) => (normalizedComments[comment.id] = comment));

  // console.log("Normalized Comments", normalizedComments)

  let test = Object.values(normalizedComments);
  test.sort((a, b) => {
    let da = new Date(a.createdAt);
    let db = new Date(b.createdAt);
    return da - db;
  });

  test.reverse();

  // console.log("SORTED ARRAY", obj.id, test);
  // const chronologicalComments = [];
  // test.forEach((comment) => {
  // chronologicalComments.push(obj.comments);
  // });

  return (
    <div className="comments-drop-down">
      <div className="comment-drop-down-nav">
        <div
          className={`comments-icon-dropdown ${
            isCommentsOpen ? "activated" : ""
          }`}
          onClick={commentsBoxDisplay}
        >
          <IoChatbubbleOutline size={18} /> {test.length}
        </div>
        <div
          className={`likes-icon-dropdown ${isLikesOpen ? "activated" : ""}`}
          onClick={likesBoxDisplay}
        >
          <IoHeartOutline size={20} /> {usersLikes.length}
        </div>
      </div>
      {isCommentsOpen && (
        <div className="comments-new-post">
          {user && (
            <div className="comments-submit-container">
              <img
                className="left-side-nav-current-user-pfp-comments"
                src={user?.profilePic}
                alt="avatar"
              />
              <div className="comments-box-and-submit">
                <div className="comment-input-box-parent-div">
                  <textarea
                    value={comment}
                    maxLength="255"
                    onChange={(e) => {
                      e.stopPropagation();
                      setComment(e.target.value);

                      // console.log(obj)
                      const textarea = e.target;
                      const scrollHeight = textarea.scrollHeight;
                      if (scrollHeight < 150) {
                        textarea.style.height = `${scrollHeight}px`;
                      } else {
                        textarea.style.overflowY = "scroll";
                      }
                      if (!e.target.value) {
                        textarea.style.height = "30px";
                      }
                    }}
                    onFocus={() => {
                      const parent = document.querySelector(
                        ".comments-box-and-submit"
                      );
                      parent.style.borderColor = "white";
                    }}
                    onBlur={() => {
                      const parent = document.querySelector(
                        ".comments-box-and-submit"
                      );
                      parent.style.borderColor = "grey";
                    }}
                    className="comment-input-box"
                    type="text"
                    placeholder="Have something to say?"
                    onKeyDown={textAreaEnterKey}
                  ></textarea>
                </div>
                <button
                  className="comment-submit-button"
                  disabled={lengthCheck()}
                  onClick={handleSubmit}
                >
                  Reply
                </button>
              </div>
            </div>
          )}

          {obj.comments.length ? (
            <div
              className={`comments-posted-comments ${
                isCommentsOpen ? "active" : "hidden"
              }`}
            >
              <div className="comments-list">
                {test.map((ele) => (
                  <Comments comment={ele} />
                ))}
              </div>
            </div>
          ) : (
            <div className="comments-posted-none">
              <IoChatbubbleOutline size={50} />
              <p>Be the first to reply!</p>
            </div>
          )}
        </div>
      )}
      {isLikesOpen && obj.likes.length && !isCommentsOpen ? (
        <div className="likes-list">
          {usersLikes.map((ele) => (
            <div className="likes-list-div">
              <div className="likes-list-pfp-username">
                <img
                  className="comments-list-pfp"
                  src={ele?.profilePic}
                  alt="avatar"
                />
                <p>{ele.username}</p>
              </div>
              <div className="likes-list-follow">
                {user && !followCheck(ele.id, user) && ele.id !== user.id && (
                  <button
                    className="likes-list-button"
                    onClick={(e) => dispatch(removeFollowingThunk(user, ele))}
                  >
                    Unfollow
                  </button>
                )}
                {user && followCheck(ele.id, user) && ele.id !== user.id && (
                  <button
                    className="likes-list-button"
                    onClick={(e) => dispatch(addFollowingThunk(user, ele))}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`comments-posted-none ${
            isCommentsOpen ? "hide" : "active"
          }`}
        >
          <IoHeartOutline size={60} />
          <p>Be the first to like!</p>
        </div>
      )}
    </div>
  );
}

export default CommentBox;
