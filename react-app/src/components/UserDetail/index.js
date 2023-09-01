import PostCard from "../PostsCard";
import "./UserDetail.css"
import { removeFollowingThunk, addFollowingThunk } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { NoContent } from "../NoContent";
import { useNonClosingModal } from "../../context/NonClosingModal";



export function UserDetail({ user }) {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.users);
  const postState = useSelector((state) => state.posts);
  const allUsers = userState.users;
  const allPosts = postState.posts;
  const currentUser = userState.singleUser;
  const followings = currentUser.userFollowing.map(following => following.id)
  const [selection, setSelection] = useState("posts")
  const userFollowing = user.userFollowing
  const userFollowers = user.userFollowers
  const { setModalContent, closeModal } = useNonClosingModal()

  const handleHeight = () => {
    const modal = document.querySelector("#non-closing-modal_content")
    if (modal.offsetHeight >= window.innerHeight) {
      modal.style.top = "0px"
    }
  }

  return (
    <div className="user-detail_container">
      <div
        className="user-detail_exit"
        onClick={() => closeModal()}
      >
        <i class="fa-solid fa-x" />
      </div>
      <img src={user.bannerPic} alt="banner" className="user-detail_banner" />
      <img src={user.profilePic} alt="avatar" className="user-detail_avatar" />
      <div className="user-detail_info">
        <div className="user-detail_profile">
          {user.nickname && <span className="user-detail_nickname">{user.nickname}</span>}
          <span className="user-detail_username">@{user.username}</span>
          <span className="user-detail_bio">{user.bio ? user.bio : "No description yet"}</span>
          {
            followings.includes(user.id) ?
              <button
                onClick={() => dispatch(removeFollowingThunk(currentUser, allUsers[user.id]))}
              >
                Following
              </button> :
              <button
                onClick={() => dispatch(addFollowingThunk(currentUser, allUsers[user.id]))}
              >
                Follow
              </button>
          }
        </div>
        <div className="user-detail_selection">
          <div>
            <span
              className={`${selection === "posts" ? "selected" : ""}`}
              onClick={() => setSelection("posts")}
            >
              Posts
            </span>
            <span
              className={`${selection === "likes" ? "selected" : ""}`}
              onClick={() => setSelection("likes")}
            >
              Likes
            </span>
            <span
              className={`${selection === "following" ? "selected" : ""}`}
              onClick={() => setSelection("following")}
            >
              Following
            </span>
            <span
              className={`${selection === "follower" ? "selected" : ""}`}
              onClick={() => setSelection("follower")}
            >
              Follower
            </span>
          </div>
        </div>
        {
          selection === "posts" &&
          <div className="user-detail_posts">
            {user.posts.length ?
              user.posts.map((post, i) => {
                return (
                  <PostCard obj={post} id={post.id} />
                )
              }) :
              <NoContent text={"No post yet"} />}
          </div>
        }
        {
          selection === "likes" &&
          <div className="user-detail_posts">
            {user.likes.length ?
              user.likes.map((like, i) => {
                return (
                  <PostCard obj={allPosts[like.postId]} id={allPosts[like.postId]["id"]} />
                )
              }) :
              <NoContent text={"No likes yet"} />}
          </div>
        }
        {
          (selection === "following" || selection === "follower") &&
          <div className="user-detail_follow">
            <span className="user-detail_follow-number">{selection === "follower" ? userFollowers && userFollowers.length : userFollowing && userFollowing.length} {selection === "following" ? "Following" : "Follower"}</span>
            {(selection === "following" ? userFollowing.length : userFollowers.length) && (selection === "following" ? userFollowing : userFollowers).map((userId, i) => {
              console.log(userFollowing)
              const user = allUsers[userId]
              const posts = user.posts ? user.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []
              const latestPost = posts[0]
              const lastUpdateDays = latestPost ? (new Date(Date.now()) - new Date(latestPost.createdAt)) / (3600000 * 24) : null
              let lastUpdate
              if (lastUpdateDays) {
                if (lastUpdateDays >= 365) {
                  lastUpdate = `Updated ${(lastUpdateDays / 365).toFixed(1)} years ago`
                } else if (lastUpdateDays >= 30) {
                  lastUpdate = `Updated ${(lastUpdateDays / 30).toFixed(1)} months ago`
                } else if (lastUpdateDays >= 1) {
                  lastUpdate = `Updated ${lastUpdateDays.toFixed(0)} days ago`
                } else {
                  lastUpdate = `Updated ${(lastUpdateDays * 24).toFixed(0)} hours ago`
                }
              }

              return (
                <div
                  className="user-detail_follow-single-user" key={i}
                  onClick={async () => {
                    setModalContent(<UserDetail user={user} key={Math.random()} />)
                    setTimeout(handleHeight, 500)
                  }}
                >
                  <img src={user.profilePic} alt="avatar" />
                  <div>
                    <span className="user-detail_follow-username"><b>{user.username}</b></span>
                    <span className="user-detail_follow-bio">{user.bio ? user.bio : "No description yet"}</span>
                  </div>
                  <span className="user-detail_follow-update">{lastUpdate ? lastUpdate : "No post yet"}</span>
                  {
                    userId !== currentUser.id ?
                      followings.includes(userId) ?
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            dispatch(removeFollowingThunk(currentUser, allUsers[userId]))
                          }}
                        >
                          Unfollow
                        </button> :
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            dispatch(addFollowingThunk(currentUser, allUsers[userId]))
                          }}
                        >
                          Follow
                        </button> :
                      null
                  }
                </div>
              )
            })}

          </div>
        }
      </div>

    </div>

  )
}
