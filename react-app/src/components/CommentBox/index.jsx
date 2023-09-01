import { useDispatch } from "react-redux";
import React, { useState } from "react"
import { useSelector } from "react-redux";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { TiCancel } from "react-icons/ti";
import { addFollowingThunk } from "../../store/user";
import { removeFollowingThunk } from "../../store/user";
import { deleteNoteThunk } from "../../store/note";
import './index.css'
import { addCommentThunk } from "../../store/post";
import { updateNotesThunk} from "../../store/note"

function CommentBox({ obj, id }) {
    const dispatch = useDispatch();
    const commentOwners = useSelector((state) => state.users.users)
    // console.log('commentowners', commentOwners)
    // console.log('likes', obj.likes)
    const user = useSelector((state) => state.session.user);
    const [comment, setComment] = useState("")
    const [isCommentsOpen, setIsCommentsOpen] = useState(true);
    const [isLikesOpen, setIsLikesOpen] = useState(false);
    // console.log('comments array', obj)

    const userInfo = useSelector(state => state.users.singleUser)
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
        if(isCommentsOpen === true) {
            return;
        }
        setIsCommentsOpen(!isCommentsOpen)
        setIsLikesOpen(!setIsLikesOpen)
    }

    const likesBoxDisplay = () => {
        if(isLikesOpen === true) {
            return;
        }
        setIsLikesOpen(!isLikesOpen)
        setIsCommentsOpen(!isCommentsOpen)
    }

    //preventing using Enter button func

    const textAreaEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    const likeChecks = (obj) => {
        let userIds = [];
        let tmp = obj.likes;
        tmp.forEach((obj) => userIds.push(obj.userId));
        return userIds
      };

    const likesArr = likeChecks(obj);
    // console.log('likes array', likesArr)
    const usersLikes = []
    Object.values(commentOwners).forEach((user) => {
        if (likesArr.includes(user.id)) {
            usersLikes.push(user)
        }
    })
    // console.log('usersLikes', usersLikes)

    const handleSubmit = (e) => {
        e.preventDefault()

    const createComment = {
        user_id: user.id,
        post_id: obj.id,
        comment
    }

    dispatch(addCommentThunk(createComment, user.id))

    setComment("")
    }

    const lengthCheck = () => {
        if(comment.length === 0) return true;
        else return false;
    }

    //Dynamic Update Comment

    // const [updateComment, setUpdateComment] = useState(false);

    // const updateComments = "comment-p" + (updateComment ? "" : " hidden")








    return (
        <div className="comments-drop-down">
            <hr style={{marginBottom: '10px'}}/>
            <div className="comment-drop-down-nav">
                <div className="comments-icon-dropdown">
                    <FaRegComment size={26} onClick={commentsBoxDisplay}/>
                </div>
                <div className="likes-icon-dropdown">
                    <FaRegHeart size={26} onClick={likesBoxDisplay}/>
                </div>
            </div>
            <hr style={{marginBottom: '15px'}}/>
            {isCommentsOpen && (
            <div className="comments-new-post">
                {user && (
                <div className="comments-submit-container">
                    <img className="left-side-nav-current-user-pfp-comments" src={user?.profilePic} alt="avatar" />
                    <div className="comments-box-and-submit">
                        <div className="comment-input-box-parent-div">
                            <textarea value={comment} maxLength="255" onChange={(e) => {
                                setComment(e.target.value);

                                // console.log(obj)
                                const textarea = e.target
                                const scrollHeight = textarea.scrollHeight
                                if(scrollHeight < 49) {
                                    textarea.style.height = `${scrollHeight}px`
                                } else {
                                    textarea.style.overflowY = 'scroll'
                                }
                            }} className='comment-input-box' type='text' placeholder="Comment here" onKeyDown={textAreaEnterKey}></textarea>
                        </div>
                        <button className="comment-submit-button" disabled={lengthCheck()} onClick={handleSubmit}> Submit</button>
                    </div>
                </div>)}
                <div className={`comments-posted-comments ${isCommentsOpen ? 'active' : 'hidden'}`}>
                    <div className="comments-list">
                    {obj.comments.map(ele => (
                                <div id={ele.id + "container"} className="comments-list-div">
                                <img className="comments-list-pfp" src={commentOwners[ele.userId]?.profilePic} alt="avatar" />
                                <div className="comments-list-username">
                                <div className="comments-input-box-parent-div">
                                <li id={"li" + ele.id} key={ele.id}>
                                <p style={{fontWeight: 'bolder'}}>{commentOwners[ele.userId]?.username}</p>
                                <p id={ele.id}>{ele.comment}</p>
                                {user && ele.userId === user.id && (<button className='comments-list-owner-delete' id={"dbutton" + ele.id} onClick={e => dispatch(deleteNoteThunk(ele.id))}><FaRegTrashAlt /></button>)}
                                {user && ele.userId === user.id && (<button className='comments-list-owner-edit' id={"ebutton" + ele.id} onClick={e => {
                                    let comment = document.getElementById(ele.id)
                                    comment.className = "hidden"
                                    let dbutton = document.getElementById("dbutton" + ele.id)
                                    dbutton.className = "hidden comments-list-owner-delete"
                                    let ebutton = document.getElementById("ebutton" + ele.id)
                                    ebutton.className = "hidden comments-list-owner-edit"
                                    let cbutton = document.getElementById("cbutton" + ele.id)
                                    cbutton.className = "edit-comment-cancel"
                                    let sbutton = document.getElementById("sbutton" + ele.id)
                                    sbutton.className = "edit-comment-submit"
                                    let updatearea = document.createElement("textarea")
                                    updatearea.setAttribute("id", "ta" + ele.id)
                                    updatearea.setAttribute("cols", "50")
                                    updatearea.setAttribute("rows", "10")
                                    updatearea.setAttribute("autocus", "true")
                                    updatearea.setAttribute("class", "comment-input-area")

                                    updatearea.innerText = comment.innerText
                                    let list = document.getElementById("li" + ele.id)
                                    list.insertBefore(updatearea, comment)
                                    // console.log(comment.innerText)
                                }}><FaRegEdit /></button>)}

                                    {user && ele.userId === user.id && (<button style={{border: 'none', backgroundColor: 'rgb(24 51 82)'}} className="hidden" id={"cbutton" + ele.id} onClick={e => {
                                        let comment = document.getElementById(ele.id)
                                        comment.className = ""
                                        let dbutton = document.getElementById("dbutton" + ele.id)
                                        dbutton.className = "comments-list-owner-delete"
                                        let ebutton = document.getElementById("ebutton" + ele.id)
                                        ebutton.className = "comments-list-owner-edit"
                                        let sbutton = document.getElementById("sbutton" + ele.id)
                                        sbutton.className = "hidden edit-comment-submit"
                                        let cbutton = document.getElementById("cbutton" + ele.id)
                                        cbutton.className = "hidden edit-comment-cancel"
                                    let updatearea = document.getElementById("ta" + ele.id)
                                    updatearea.remove()
                                }}><TiCancel className="edit-comment-cancel" size={27}/></button>)}

                                    {user && ele.userId === user.id && (<button style={{border: 'none', backgroundColor: 'rgb(24 51 82)'}} className="hidden" id={"sbutton" + ele.id} onClick={e => {
                                    let textarea = document.getElementById("ta" + ele.id)
                                    dispatch(updateNotesThunk({"user_id": ele.userId, "post_id": ele.postId, "comment": textarea.value}, ele.id))
                                    let comment = document.getElementById(ele.id)
                                    comment.className = ""
                                    comment.innerText = textarea.value
                                    let dbutton = document.getElementById("dbutton" + ele.id)
                                    dbutton.className = "comments-list-owner-delete"
                                    let ebutton = document.getElementById("ebutton" + ele.id)
                                    ebutton.className = "comments-list-owner-edit"
                                    let sbutton = document.getElementById("sbutton" + ele.id)
                                    sbutton.className = "hidden edit-comment-submit"
                                    let cbutton = document.getElementById("cbutton" + ele.id)
                                    cbutton.className = "hidden edit-comment-cancel"
                                    let updatearea = document.getElementById("ta" + ele.id)
                                    updatearea.remove()
                                }}><VscSend className="edit-comment-submit" size={25}/></button>)}
                                </li>
                                </div>
                                </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>)}
            {isLikesOpen && (
                <div className="likes-list">
                    {usersLikes.map(ele => (
                                <div className="likes-list-div">
                                <div className='likes-list-pfp-username'>
                                    <img className="comments-list-pfp" src={ele?.profilePic} alt="avatar" />
                                    <p>{ele.username}</p>
                                </div>
                                <div className="likes-list-follow">
                                    {user && !followCheck(ele.id, user) && ele.id !== user.id && (
                                        <button className='likes-list-button' onClick={(e) => dispatch(removeFollowingThunk(user, ele))}>Unfollow</button>
                                    )}
                                    {user && followCheck(ele.id, user) && ele.id !== user.id && (
                                        <button className='likes-list-button' onClick={(e) => dispatch(addFollowingThunk(user, ele))}>Follow</button>
                                    )}
                                </div>
                                </div>
                            )
                        )}
                </div>
            )}
        </div>
    )
}

export default CommentBox;
