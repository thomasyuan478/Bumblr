import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeFollowingThunk, addFollowingThunk } from "../../store/user";
import "./Follow.css"
import { useNonClosingModal } from "../../context/NonClosingModal";
import { UserDetail } from "../UserDetail";


export function Follow({ type }) {
  const userState = useSelector((state) => state.users);
  const allUsers = userState.users;
  const currentUser = userState.singleUser;
  const dispatch = useDispatch()
  const { setModalContent } = useNonClosingModal()

  if (!userState) {
    return null
  }

  const followings = currentUser.userFollowing ? currentUser.userFollowing.map(following => following.id) : null
  const followers = currentUser.userFollowers ? currentUser.userFollowers.map(follower => follower.id) : null
  const users = type === "following" ? followings : followers

  const handleHeight = () => {
    const modal = document.querySelector("#non-closing-modal_content")
    if (modal.offsetHeight >= window.innerHeight) {
        modal.style.top = "0px"
    }
}

  return (
    <div className="follow">
      <span className="follow_number">{type === "follower" ? followers && followers.length : followings && followings.length } {type === "following" ? "Following" : "Follower"}</span>
      <div className="follow_container">
        {users && users.map((userId, i) => {
          const user = allUsers[userId]
          const posts = user.posts ? user.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []
          const latestPost = posts[0]
          const lastUpdateDays = latestPost ? (new Date(Date.now()) - new Date(latestPost.createdAt)) / (3600000 * 24) : null
          let lastUpdate
          if (lastUpdateDays) {
            if (lastUpdateDays >= 365) {
              lastUpdate = `Updated ${(lastUpdateDays / 365).toFixed(1)} years ago`
            } else if (lastUpdateDays < 30) {
              lastUpdate = `Updated ${(lastUpdateDays / 30).toFixed(1)} months ago`
            } else if (lastUpdate < 1) {
              lastUpdate = `Updated ${(lastUpdateDays * 24).toFixed(0)} hours ago`
            }
          }

          return (
            <div
              className="follow_single-user" key={i}
              onClick={async () => {
                setModalContent(<UserDetail user={user} />)
                setTimeout(handleHeight, 500)
              }}
            >
              <img src={user.profilePic} alt="avatar" />
              <div>
                <span className="follow_single-user_username"><b>{user.username}</b></span>
                <span className="follow_single-user_bio">{user.bio ? user.bio : "No description yet"}</span>
              </div>
              <span className="follow_single-user_update">{lastUpdate ? lastUpdate : "No post yet"}</span>
              {
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
                  </button>
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}
