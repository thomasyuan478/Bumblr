import { useHistory } from "react-router-dom";
import home from "../../nav-icons/home.png";
import menu from "../../nav-icons/menu.png";
import add from "../../nav-icons/add.png";
import delete1 from "../../nav-icons/delete.png";
import login from "../../nav-icons/login.png";
import logout from "../../nav-icons/logout.png";
import settings from "../../nav-icons/settings.png";
import bolt from "../../nav-icons/bolt.png";
import chat from "../../nav-icons/chat.png";
import explore from "../../nav-icons/explore.png";
import store from "../../nav-icons/store.png";
import video from "../../nav-icons/video.png";
import star from "../../nav-icons/star.png";
import mail from "../../nav-icons/mail.png";
import account from "../../nav-icons/account.png";
import arrow from "../../nav-icons/arrow.png";
import "./index.css";

function LeftSideNavigation() {
  let history = useHistory();
  return (
    <div className="entire-page">
      <div className="feed-page">
        <div>hello</div>
      </div>
      <div className="left-side-nav-page">
        <div className="left-side-nav-home" onClick={() => history.push("/")}>
          <img src={home} alt="" /> Home
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={explore} alt="" /> Explore
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={video} alt="" /> <p>Live</p>
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={bolt} alt="" /> <p>Activity</p>
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={chat} alt="" /> <p>Messages</p>
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={mail} alt="" /> <p>Inbox</p>
        </div>
        <div className="left-side-nav-account" onClick="">
          <div className="left-side-nav-account-arrow-seperator">
            <img src={account} alt="" /> <p>Account</p>
          </div>
          <img src={arrow} alt="" />
        </div>
        {/* 
        <div style={{marginLeft: '200px'}}><p>likes, following, logout</p></div> 
        what needs to be displayed under account
        */}
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={settings} alt="" /> <p>Settings</p>
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={store} alt="" /> <p>BumblrMart</p>
        </div>
        <div
          className="left-side-nav-coming-soon"
          onClick={() => alert("Feature coming soon!")}
        >
          <img src={star} alt="" /> <p>Go Ad-Free</p>
        </div>
        <hr />
        <div>
          <img src={menu} alt="" /> Menu
        </div>
        <div>
          <img src={add} alt="" /> Add
        </div>
        <div>
          <img src={delete1} alt="" /> Delete
        </div>
        <div>
          <img src={login} alt="" /> Login
        </div>
        <div>
          <img src={logout} alt="" /> Logout
        </div>
      </div>
    </div>
  );
}

export default LeftSideNavigation;
