import { useState } from "react";
import "./index.css";

export function Post() {
  const post = useSelector((state) => state.posts.singlePost);
  const sessionUser = useSelector((state) => state.session.user);
  const [re, setRe] = useState([]);
  if (!post) return null;
  const isOwner = sessionUser?.id === post.ownerId;
  const isFollowing = re?.find((ele) => ele.User?.id === sessionUser?.id);

  if ((type = text)) {
    return (
      <div>
        <div className="post-text-profile-pic">profile pic goes here</div>
        <div className="post">
          <div className="post-text-header">
            <p className="post-text-username">
              username of post owner goes here
            </p>
            {sessionUser && !isOwner && !isFollowing && (
              <p className="post-text-follow-button">follow button goes here</p>
            )}
            <p className="post-text-options-button">options button goes here</p>
          </div>
          <hr />
          <div className="post-text-main-body">
            <p className="post-text-body">body goes here</p>
            <p className="post-text-tags">tags go here</p>
          </div>
          {isOwner && (
            <div className="post-text-owner-buttons">
              <button className="post-text-blaze-icon">
                blaze button goes here
              </button>
              <button className="post-text-delete-button">
                delete button goes here
              </button>
              <button className="post-text-edit-button">
                edit button goes here
              </button>
            </div>
          )}
          <hr />
          <div className="post-text-footer">
            <p className="post-text-notes">notes count</p>
            <p className="post-text-reply">reply button</p>

            <p className="post-text-like">like button</p>
          </div>
        </div>
      </div>
    );
  }

  if ((type = image)) {
    return (
      <div>
        <div className="post-image-profile-pic">profile pic goes here</div>
        <div className="post">
          <div className="post-image-header">
            <p className="post-image-username">
              username of post owner goes here
            </p>
            {sessionUser && !isOwner && !isFollowing && (
              <p className="post-image-follow-button">
                follow button goes here
              </p>
            )}
            <p className="post-image-options-button">
              options button goes here
            </p>
          </div>
          <div className="post-image-main-body">
            <p className="post-image-picture">picture goes here</p>
            <p className="post-image-body">body goes here</p>
            <p className="post-image-tags">tags go here</p>
          </div>
          {isOwner && (
            <div className="post-image-owner-buttons">
              <button className="post-image-blaze-icon">
                blaze button goes here
              </button>
              <button className="post-image-delete-button">
                delete button goes here
              </button>
              <button className="post-image-edit-button">
                edit button goes here
              </button>
            </div>
          )}
          <hr />
          <div className="post-image-footer">
            <p className="post-image-notes">notes count</p>
            <p className="post-image-reply">reply button</p>

            <p className="post-image-like">like button</p>
          </div>
        </div>
      </div>
    );
  }

  if ((type = quote)) {
    return (
      <div>
        <div className="post-quote-profile-pic">profile pic goes here</div>
        <div className="post">
          <div className="post-quote-header">
            <p className="post-quote-username">
              username of post owner goes here
            </p>
            {sessionUser && !isOwner && !isFollowing && (
              <p className="post-quote-follow-button">
                follow button goes here
              </p>
            )}
            <p className="post-quote-options-button">
              options button goes here
            </p>
          </div>
          <hr />
          <div className="post-quote-main-body">
            <h1 className="post-quote-title">quote goes here</h1>
            <p className="post-quote-body">body or author goes here</p>
            <p className="post-quote-tags">tags go here</p>
          </div>
          {isOwner && (
            <div className="post-quote-owner-buttons">
              <button className="post-quote-blaze-icon">
                blaze button goes here
              </button>
              <button className="post-quote-delete-button">
                delete button goes here
              </button>
              <button className="post-quote-edit-button">
                edit button goes here
              </button>
            </div>
          )}
          <hr />
          <div className="post-quote-footer">
            <p className="post-quote-notes">notes count</p>
            <p className="post-quote-reply">reply button</p>

            <p className="post-quote-like">like button</p>
          </div>
        </div>
      </div>
    );
  }

  if ((type = link)) {
    return (
      <div>
        <div className="post-link-profile-pic">profile pic goes here</div>
        <div className="post">
          <div className="post-link-header">
            <p className="post-link-username">
              username of post owner goes here
            </p>
            {sessionUser && !isOwner && !isFollowing && (
              <p className="post-link-follow-button">follow button goes here</p>
            )}
            <p className="post-link-options-button">options button goes here</p>
          </div>
          <hr />
          <div className="post-link-main-body">
            <p className="post-link-display">display of website goes here</p>
            <p className="post-link-body">body goes here</p>
            <p className="post-link-tags">tags go here</p>
          </div>
          {isOwner && (
            <div className="post-link-owner-buttons">
              <button className="post-link-blaze-icon">
                blaze button goes here
              </button>
              <button className="post-link-delete-button">
                delete button goes here
              </button>
              <button className="post-link-edit-button">
                edit button goes here
              </button>
            </div>
          )}
          <hr />
          <div className="post-link-footer">
            <p className="post-link-notes">notes count</p>
            <p className="post-link-reply">reply button</p>

            <p className="post-link-like">like button</p>
          </div>
        </div>
      </div>
    );
  }
}
