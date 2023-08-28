import { useSelector } from "react-redux";
import "./index.css";

export function Post() {
    const sessionUser = useSelector((state) => state.session.user);

    if('type = text') {
    return (
        <div>
        <div className="create-text-post-profile-pic">
            profile pic goes here
        </div>
        <div className="create-text-post">
            <div className="create-text-post-header">
                <p className="create-text-post-username">
                    username of post owner goes here
                </p>  
                <p className="create-text-post-settings-button">
                    settings button goes here
                </p>
            </div>
            <div className="create-text-post-main-body">
                <h3 className="create-text-post-title">
                    title goes here
                </h3>
                <p className="create-text-post-body">
                    body goes here aswell as custom buttons
                </p>
                <p className="create-text-post-tags">
                    tags go here
                </p>
            </div>
            <hr />
            <div className="create-text-post-footer">
                <p className="create-text-post-close-button">
                    close button goes here
                </p>
                <p className="create-text-post-submit-button">
                    post now button goes here
                </p>
            </div>
        </div>
        </div>
    )
    }

    if('type = image') {
    return (
        <div>
        <div className="create-image-post-profile-pic">
            profile pic goes here
        </div>
        <div className="create-image-post">
            <div className="create-image-post-header">
                <p className="create-image-post-username">
                    username of post owner goes here
                </p>  
                <p className="create-image-post-settings-button">
                    settings button goes here
                </p>
            </div>
            <div className="create-image-post-main-body">
                <p className="create-image-post-upload">
                    upload image file here
                </p>
                <p className="create-image-post-link">
                    upload image link here
                </p>
                <p className="create-image-post-limit-message">
                    Psst, heads up: You can upload up to 30 image files, or add 30 web URLs!
                </p>
                <p className="create-image-post-body">
                    body goes here aswell as custom buttons
                </p>
                <p className="create-image-post-tags">
                    tags go here
                </p>
            </div>
            <hr />
            <div className="create-image-post-footer">
                <p className="create-image-post-close-button">
                    close button goes here
                </p>
                <p className="create-image-post-submit-button">
                    post now button goes here
                </p>
            </div>
        </div>
        </div>
    )
}

if('type = quote') {
    return (
        <div>
        <div className="create-quote-post-profile-pic">
            profile pic goes here
        </div>
        <div className="create-quote-post">
            <div className="create-quote-post-header">
                <p className="create-quote-post-username">
                    username of post owner goes here
                </p>  
                <p className="create-quote-post-settings-button">
                    settings button goes here
                </p>
            </div>
            <div className="create-quote-post-main-body">
                <h1 className="create-quote-post-title">
                    your 'quote' goes here
                </h1>
                <p className="create-quote-post-body">
                    body goes here aswell as custom buttons
                </p>
                <p className="create-quote-post-tags">
                    tags go here
                </p>
            </div>
            <hr />
            <div className="create-quote-post-footer">
                <p className="create-quote-post-close-button">
                    close button goes here
                </p>
                <p className="create-quote-post-submit-button">
                    post now button goes here
                </p>
            </div>
        </div>
        </div>
    )
}

if('type = link') {
    return (
        <div>
        <div className="create-link-post-profile-pic">
            profile pic goes here
        </div>
        <div className="create-link-post">
            <div className="create-link-post-header">
                <p className="create-link-post-username">
                    username of post owner goes here
                </p>  
                <p className="create-link-post-settings-button">
                    settings button goes here
                </p>
            </div>
            <div className="create-link-post-main-body">
                <h3 className="create-link-post-title">
                    type or paste link here
                </h3>
                <p className="create-link-post-body">
                    body goes here aswell as custom buttons
                </p>
                <p className="create-link-post-tags">
                    tags go here
                </p>
            </div>
            <hr />
            <div className="create-link-post-footer">
                <p className="create-link-post-close-button">
                    close button goes here
                </p>
                <p className="create-link-post-submit-button">
                    post now button goes here
                </p>
            </div>
        </div>
        </div>
    )
}
}