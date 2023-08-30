import React from 'react';
import { NavLink } from 'react-router-dom';
import parse from "html-react-parser";
import "./PostCard.css"

const PostCard = ({ obj, id }) => {
  console.log('obj here ------', obj)

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
          {/* conditional here that will only render this div if the user is not following the poster */}
          <div className='user-follow-button'>
            <button className='posts-follow-button'>Follow</button>
          </div>
        </div>
        <div className='post-settings-dropdown'>
          {/* Conditional here for if user is owner of post to allow delete and update post */}
          <button className='post-settings-button'><i class="fa-solid fa-ellipsis"></i></button>
        </div>
      </div>
      <div className='post-content'>
        {parse(obj.content)}
      </div>
      <div className='notes-container'>
        <div className='notes-dropdown-menu'>
          <button className='notes-button'><span style={{fontWeight:"bolder"}}>{obj.comments.length + obj.likes.length}</span> notes</button>
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
            {/* Will go to another component to render */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard;
