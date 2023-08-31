import React, { useState } from "react"
import { useSelector } from "react-redux";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import './index.css'

function CommentBox({ obj, id }) {
    const commentOwners = useSelector((state) => state.users.users)
    console.log('commentowners', commentOwners)
    console.log('likes', obj.likes)
    const user = useSelector((state) => state.session.user);
    const [isCommentsOpen, setIsCommentsOpen] = useState(true);
    const [isLikesOpen, setIsLikesOpen] = useState(false);
    // console.log('comments array', obj)


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
    console.log('likes array', likesArr)
    const usersLikes = []
    Object.values(commentOwners).forEach((user) => {
        if (likesArr.includes(user.id)) {
            usersLikes.push(user)
        }
    })
    console.log('usersLikes', usersLikes)

    return (
        <div className="comments-drop-down">
            <div className="comment-drop-down-nav">
                <div className="comments-icon-dropdown">
                    <FaRegComment size={26} onClick={commentsBoxDisplay}/>
                </div>
                <div className="likes-icon-dropdown">
                    <FaRegHeart size={26} onClick={likesBoxDisplay}/>
                </div>
            </div>
            {isCommentsOpen && (
            <div className="comments-new-post">
                <div className="comments-submit-container">
                    <img className="left-side-nav-current-user-pfp-comments" src={user?.profilePic} alt="avatar" />
                    <div className="comments-box-and-submit">
                        <div className="comment-input-box-parent-div">
                            <textarea onChange={(e) => {
                                const textarea = e.target
                                const scrollHeight = textarea.scrollHeight
                                if(scrollHeight < 49) {
                                    textarea.style.height = `${scrollHeight}px`
                                } else {
                                    textarea.style.overflowY = 'scroll'
                                }
                            }} className='comment-input-box' type='text' placeholder="Comment here" onKeyDown={textAreaEnterKey}></textarea>
                        </div>
                        <button className="comment-submit-button"> Submit</button>
                    </div>
                </div>
                <div className={`comments-posted-comments ${isCommentsOpen ? 'active' : 'hidden'}`}>
                    <div className="comments-list">
                    {obj.comments.map(ele => (
                                <div className="comments-list-div">
                                <img className="comments-list-pfp" src={commentOwners[ele.userId]?.profilePic} alt="avatar" />
                                <div className="comments-list-username">
                                <li key={ele.id}>
                                <p style={{fontWeight: 'bolder'}}>{commentOwners[ele.userId]?.username}</p>
                                <p>{ele.comment}</p>
                                </li>
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
                                <img className="comments-list-pfp" src={ele?.profilePic} alt="avatar" />
                                <div>{ele.username}</div>
                                </div>
                            )
                        )}
                </div>
            )}
        </div>
    )
}

export default CommentBox;
