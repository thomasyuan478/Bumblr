import React, { useEffect, useState, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import parse from "html-react-parser";
import { useNonClosingModal } from '../../context/NonClosingModal';
import { postPostThunk } from '../../store/post';
import { useDispatch } from 'react-redux';

export const PostEditor = ({ type, user, post }) => {
    function CustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new CustomUploadAdapter(loader)
        }
    }

    class CustomUploadAdapter {
        constructor(props) {
            this.loader = props;
        }

        async upload() {
            const file = await this.loader.file
            const url = URL.createObjectURL(file)
            setImages((prev) => {
                return { ...prev, [url]: file }
            })
            return { default: url }
        }
    }

    const headings = {
        options: [
            { model: 'paragraph', title: 'Regular', class: 'ck-heading_paragraph' },
            { model: 'heading2', view: 'h2', title: 'Biggest', class: 'ck-heading_heading1' },
            { model: 'heading3', view: 'h3', title: 'Bigger', class: 'ck-heading_heading2' },
            { model: 'quote', view: 'h6', title: 'Quote', class: 'ck-heading_quote' }
        ]
    }

    const mediaConfig = {
        previewsInData: true
    }

    const textConfiguration = {
        extraPlugins: [CustomUploadAdapterPlugin],
        title: {
            placeholder: "Put your Heading here",
        },
        placeholder: "Put your content here",
        heading: headings,
        mediaEmbed: mediaConfig
    }

    const normalConfiguration = {
        extraPlugins: [CustomUploadAdapterPlugin],
        placeholder: "Put your content here",
        removePlugins: ["Title"],
        heading: headings,
        mediaEmbed: mediaConfig
    }

    const dispatch = useDispatch();
    const [showTitle, setShowTitle] = useState(type === "text" ? true : false)
    const [showImage, setShowImage] = useState(type === "image" ? true : false)
    const [showImageInput, setShowImageInput] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [images, setImages] = useState("")
    const [showVideo, setShowVideo] = useState(type === "video" ? true : false)
    const [videoUrl, setVideoUrl] = useState("")
    const [showLink, setShowLink] = useState(type === "link" ? true : false)
    const [link, setLink] = useState("")
    const [content, setContent] = useState(type === "edit" && post.content ? post.content : (type === "quote" ? "<h6><br></h6>" : "<p><br></p>"))
    const [contentEdited, setContentEdited] = useState(type === "edit" ? true : false)
    const [tags, setTags] = useState(type === "quote" && post ? post.tags.split(", ") : [])
    const [showTagInput, setShowTagInput] = useState(false)
    const [newTag, setNewTag] = useState("")
    const [editorObj, setEditorObj] = useState("")
    const [isEmpty, setIsEmpty] = useState(true)
    const imageRef = React.useRef(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [serverErrors, setServerErrors] = useState([])
    const [urlErrors, setUrlErrors] = useState({})
    const { closeModal } = useNonClosingModal()

    const handleTitle = () => {
        if (content.includes("<h1>") && content.includes("</h1>") && showTitle) {
            setContent((prev) => {
                const titleStart = prev.indexOf("<h1>")
                const titleEnd = prev.indexOf("</h1>")
                const html = prev.slice(0, titleStart) + prev.slice(titleEnd + 5)
                return html
            })
        } else if (content.includes("<p><br></p>") && showTitle) {
            setContent((prev) => {
                const start = prev.indexOf("<p><br></p>")
                const html = prev.slice(0, start) + prev.slice(start + 11)
                return html
            })
        } else if (!showTitle) {
            setContent((prev) => {
                const html = "<p><br></p>" + prev
                return html
            })
        }
        setShowTitle((prev) => !prev)
    }

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (err) {
            return false;
        }
    }

    const getDomain = (url) => {
        const link = new URL(url)
        return link.hostname.split(".")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let html = content
        for (let i = 0; i < content.length; i += 1) {
            let startIdx = content.indexOf("<img", i)
            let endIdx = content.indexOf(">", startIdx)
            if (startIdx !== -1 && endIdx !== -1) {
                const imageNode = content.slice(startIdx, endIdx + 1)
                const src = imageNode.split(" ")[1]
                const temp_url = src.split("\"")[1]
                const image = images[temp_url]
                const formData = new FormData()
                formData.append("image", image)
                const res = await fetch("api/images/new", {
                    method: "POST",
                    body: formData
                })
                if (res.ok) {
                    const resData = await res.json()
                    const url = resData.url
                    html = html.replace(temp_url, url)
                } else if (res.status < 500) {
                    const resData = await res.json()
                    if (resData.errors) {
                        setServerErrors((prev) => {
                            prev = resData.errors
                            return [...prev]
                        })
                    }
                    return
                } else {
                    setServerErrors(["An error occurred. Please try again."])
                    return
                }
                i = endIdx
            } else {
                break
            }
        }
        const new_post = {
            user_id: user.id,
            content: html,
            tags: tags.join(", ")
        }
        const data = await dispatch(postPostThunk(new_post))
        if (data) {
            setServerErrors(data)
        } else {
            closeModal()
        }
    }

    const handleHeight = () => {
        const modal = document.querySelector("#non-closing-modal_content")
        if (modal.offsetHeight >= window.innerHeight) {
            modal.style.top = "0px"
        }
    }

    useEffect(() => {
        if (content) {
            let domList = parse(content);
            if (!Array.isArray(domList)) {
                domList = [domList]
            }
            while (domList.length) {
                const domNode = domList.pop();
                if (Array.isArray(domNode)) {
                    domList = domList.concat(domNode)
                } else {
                    if (domNode.type === "iframe" || domNode.type === "img" || domNode.type === "a") {
                        setIsEmpty(false)
                        return
                    } else {
                        if (typeof domNode.props.children === "string" && domNode.props.children) {
                            setIsEmpty(false)
                            return
                        } else {
                            if (domNode.props.children) {
                                domList.push(domNode.props.children)
                            }

                        }
                    }
                }
            }
            setIsEmpty(true)
        } else {
            setIsEmpty(true)
        }
    }, [content])

    useEffect(() => {
        const errors = {}

        if (contentEdited && isEmpty) {
            errors.content = "Post content is required"
        }

        setValidationErrors(errors)

    }, [isEmpty, contentEdited])

    useEffect(() => {
        if (!showImageInput) {
            setUrlErrors((prev) => {
                delete prev.imageUrl
                return { ...prev }
            })
            setImageUrl("")
        }
        if (!showVideo) {
            setUrlErrors((prev) => {
                delete prev.videoUrl
                return { ...prev }
            })
            setVideoUrl("")
        }
        if (!showLink) {
            setUrlErrors((prev) => {
                delete prev.link
                return { ...prev }
            })
            setLink("")
        }
    }, [showImageInput, showVideo, showLink])

    return (
        <div key={showTitle} className="post_editor-container">
            <div className={`post_editor-editor ${showImage ? "box" : showImageInput || showVideo || showLink ? "input" : "null"}`}>
                {showTitle ?
                    <CKEditor
                        editor={Editor}
                        config={textConfiguration}
                        data={content}
                        onReady={editor => {
                            // trigger event when the editor completed loading
                            setEditorObj(editor)
                        }}
                        onChange={(event, editor) => {
                            setContent(editor.getData());
                            handleHeight();
                        }}
                        onBlur={(event, editor) => {
                            setContentEdited(true)
                        }}
                        onFocus={(event, editor) => {
                            // trigger event when the editor is focused
                        }}
                    /> :
                    <CKEditor
                        editor={Editor}
                        config={normalConfiguration}
                        data={content}
                        onReady={editor => {
                            setEditorObj(editor)
                        }}
                        onChange={(event, editor) => {
                            setContent(editor.getData());
                            handleHeight();
                        }}
                        onBlur={(event, editor) => {
                            setContentEdited(true)
                        }}
                        onFocus={(event, editor) => {
                            // trigger event when the editor is focused
                        }}
                    />
                }
                <div className='post_editor-editor-buttons'>
                    <button
                        className={`post_editor-title_button ${showTitle ? "enabled" : "disabled"}`}
                        onClick={handleTitle}
                    >
                        <i className="fa-solid fa-heading" />
                    </button>
                    <button
                        className={`post_editor-image_button ${showImage || showImageInput ? "enabled" : "disabled"}`}
                        onClick={(e) => {
                            if (!showImage) {
                                setShowVideo(false)
                                setShowLink(false)
                            } else {
                                setShowImageInput(false)
                            }
                            if (showImageInput) {
                                setShowImage(false)
                            } else {
                                setShowImage((prev) => !prev)
                            }
                        }}
                    >
                        <i className="fa-solid fa-image" />
                    </button>
                    <button
                        className={`post_editor-video_button ${showVideo ? "enabled" : "disabled"}`}
                        onClick={(e) => {
                            if (!showVideo) {
                                setShowImage(false)
                                setShowImageInput(false)
                                setShowLink(false)
                            }
                            setShowVideo((prev) => !prev)
                        }}
                    >
                        <i className="fa-solid fa-video" />
                    </button>
                    <button
                        className={`post_editor-link_button ${showLink ? "enabled" : "disabled"}`}
                        onClick={(e) => {
                            if (!showLink) {
                                setShowImage(false)
                                setShowImageInput(false)
                                setShowVideo(false)
                            }
                            setShowLink((prev) => !prev)
                        }}
                    >
                        <i className="fa-solid fa-link" />
                    </button>
                </div>
                <div className='post_editor-inputs'>
                    <div className={`post_editor-input_error ${Object.values(urlErrors).length ? "show" : "hide"}`}>
                        <span><i className="fa-solid fa-triangle-exclamation" /> {Object.values(urlErrors)[0]}</span>
                    </div>
                    <div
                        className={`post_editor-image_input ${showImage ? "show" : "hide"}`}
                    >
                        <input
                            ref={imageRef}
                            type="file"
                            className="hide"
                            accept="image/*"
                            multiple={true}
                            name="images"
                            onChange={(e) => {
                                const images = Array.from(e.target.files)
                                editorObj.execute("imageUpload", {
                                    file: images
                                })
                            }}
                            onClick={(e) => e.target.value = null}
                        />
                        <label htmlFor="images">
                            <button
                                className="post_editor-image_upload_button"
                                id="post_editor-image_upload-file"
                                onClick={(e) => {
                                    e.preventDefault();
                                    imageRef.current.click();
                                }}>
                                <i className="fa-solid fa-camera" />
                                Upload Images
                            </button>
                            <button
                                className="post_editor-image_url_button"
                                id="post_editor-image_enter-url"
                                onClick={(e) => {
                                    setShowImageInput(true)
                                    setShowImage(false)
                                }}
                            >
                                <i className="fa-solid fa-earth-americas" />
                                Add Images From Web
                            </button>
                        </label>
                    </div>
                    <div
                        className={`post_editor-url_input ${showImageInput ? "show" : "hide"}`}
                    >
                        <input
                            type="url"
                            placeholder="Put image URL here"
                            value={imageUrl}
                            onChange={(e) => { setImageUrl(e.target.value) }}
                        />
                        <button
                            className="post_editor-url_button"
                            onClick={(e) => {
                                if (isValidUrl(imageUrl)) {
                                    editorObj.execute("insertImage", {
                                        source: imageUrl
                                    });
                                    setImageUrl("")
                                } else {
                                    setUrlErrors({ imageUrl: "Image URL is invalid" })
                                }
                            }}
                        >
                            <i className="fa-solid fa-check" />
                        </button>
                        <button
                            className="post_editor-url_button"
                            onClick={(e) => {
                                setShowImageInput(false)
                                setImageUrl("")
                            }}
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                    <div
                        className={`post_editor-url_input ${showVideo ? "show" : "hide"}`}
                    >
                        <input
                            type="url"
                            placeholder="Put media URL here"
                            value={videoUrl}
                            onChange={(e) => { setVideoUrl(e.target.value) }}
                        />
                        <button
                            className="post_editor-url_button"
                            onClick={(e) => {
                                if (isValidUrl(videoUrl)) {
                                    const domain = getDomain(videoUrl)
                                    if (domain[0] !== "vimeo" && domain[1] !== "dailymotion" && domain[1] !== "spotify" && domain[1] !== "youtube") {
                                        setUrlErrors({ videoUrl: "Only medias from Dailymostion, Youtube, Spotify, and Vimeo are supported" })
                                    } else {
                                        editorObj.execute("mediaEmbed", videoUrl);
                                        setVideoUrl("")
                                    }
                                } else {
                                    setUrlErrors({ videoUrl: "Media URL is invalid" })
                                }
                            }}
                        >
                            <i className="fa-solid fa-check" />
                        </button>
                        <button
                            className="post_editor-url_button"
                            onClick={(e) => {
                                setShowVideo(false)
                                setVideoUrl("")
                            }}
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                    <div
                        className={`post_editor-url_input ${showLink ? "show" : "hide"}`}
                    >
                        <input
                            type="url"
                            placeholder="Put link here"
                            value={link}
                            onChange={(e) => { setLink(e.target.value) }}
                        />
                        <button
                            className="post_editor-url_button"
                            onClick={(e) => {
                                if (isValidUrl(link)) {
                                    editorObj.execute('link', link);
                                    setLink("")
                                } else {
                                    setUrlErrors({ link: "Link is invalid" })
                                }
                            }}
                        >
                            <i className="fa-solid fa-check" />
                        </button>
                        <button
                            className="post_editor-url_button"
                            onClick={(e) => {
                                setShowLink(false)
                                setLink("")
                            }}
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                </div>
            </div>
            <div className={`post_editor-validation_error ${Object.values(validationErrors).length ? "show" : "hide"}`}>
                <span><i className="fa-solid fa-triangle-exclamation" /> {validationErrors.content}</span>
            </div>
            <div className={`post_editor-server_error ${serverErrors.length ? "show" : "hide"}`}>
                {serverErrors.map((error, i) => {
                    return (
                        <span key={i}><i className="fa-solid fa-triangle-exclamation" /> {error}</span>
                    )
                })}
            </div>
            <div className='post_editor-tags'>
                {tags.map((tag, i) => {
                    return (
                        <div
                            key={i}
                            className='post_editor-tag'
                        >
                            <span>{`#${tag}`}</span>
                            <button
                                onClick={() => {
                                    setTags((prev) => {
                                        prev.splice(i, 1)
                                        return [...prev]
                                    })
                                }}
                            >
                                <i className="fa-solid fa-xmark" />
                            </button>
                        </div>
                    )
                })}
                <input
                    type='text'
                    className={showTagInput ? "post_editor-tag_input" : "hide"}
                    value={newTag}
                    onChange={(e) => {
                        setNewTag(e.target.value)
                        e.target.style.width = "30px"
                        e.target.style.width = `${e.target.scrollWidth}px`
                    }}
                    onBlur={(e) => {
                        if (newTag) {
                            setShowTagInput(false)
                            setTags((prev) => {
                                prev.push(e.target.value)
                                return [...prev]
                            })
                            setNewTag("")
                            e.target.style.width = "30px"
                        } else {
                            setShowTagInput(false)
                        }
                    }}
                    style={{ width: "30px" }}
                />
                <button
                    className='post_editor-tag_button'
                    onClick={(e) => {
                        setShowTagInput(true)
                    }}
                >
                    {tags.length || showTagInput ? "+" : "# Add tags to help people find your post"}
                </button>
            </div>
            <div className='post_editor-submit_button'>
                <button
                    onClick={closeModal}
                >
                    Close
                </button>
                <button
                    disabled={Object.values(validationErrors).length || (!contentEdited && isEmpty)}
                    onClick={handleSubmit}
                >
                    Post
                </button>
            </div>
        </div>
    );
}
export default PostEditor;
