import { useSelector } from "react-redux";
import "./NewPost.css"
import { useModal } from "../../context/Modal";
import { PostEditorContainer } from "../PostEditor";

export function NewPost() {
  const user = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();

  if (!user) {
    return null
  }

  return (
    <div className="create_post_container-buttons">
      <button
        className="create_post_container-button"
        onClick={(e) => setModalContent(<PostEditorContainer type="text" />)}
      >
        <i className="fa-solid fa-a" />
        <span>Text</span>
      </button>
      <button
        className="create_post_container-button"
        onClick={(e) => setModalContent(<PostEditorContainer type="image" />)}
      >
        <i className="fa-solid fa-camera" />
        <span>Photo</span>
      </button>
      <button
        className="create_post_container-button"
        onClick={(e) => setModalContent(<PostEditorContainer type="quote" />)}
      >
        <i className="fa-solid fa-quote-left" />
        <span>Quote</span>
      </button>
      <button
        className="create_post_container-button"
        onClick={(e) => setModalContent(<PostEditorContainer type="link" />)}
      >
        <i className="fa-solid fa-link" />
        <span>Link</span>
      </button>
      <button
        className="create_post_container-button"
        onClick={(e) => setModalContent(<PostEditorContainer type="video" />)}
      >
        <i className="fa-solid fa-video" />
        <span>Media</span>
      </button>
    </div>
  )
}
