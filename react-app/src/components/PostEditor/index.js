import { useHistory } from "react-router-dom";
import { PostEditor } from "./PostEditor"
import { useSelector } from "react-redux";
import "./PostEditor.css"

export function PostEditorContainer({ type }) {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  if (!user) {
    return history.replace("/error/401");
  }
  return (
    <div className="post_editor_container">
      <span className="post_editor_container-username">{user.username}</span>
      <PostEditor type={type} />
      <img className="post_editor_container-avatar" src={user.profilePic} alt="avatar" />
    </div>
  )
}
