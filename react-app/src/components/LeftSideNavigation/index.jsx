import home from '../../nav-icons/home.png'
import search from '../../nav-icons/search.png'
import menu from '../../nav-icons/menu.png'
import add from '../../nav-icons/add.png'
import delete1 from '../../nav-icons/delete.png'
import login from '../../nav-icons/login.png'
import logout from '../../nav-icons/logout.png'
import settings from '../../nav-icons/settings.png'
import bolt from '../../nav-icons/bolt.png'
import chat from '../../nav-icons/chat.png'
import explore from '../../nav-icons/explore.png'
import store from '../../nav-icons/store.png'
import video from '../../nav-icons/video.png'
import star from '../../nav-icons/star.png'
import mail from '../../nav-icons/mail.png'
import account from '../../nav-icons/account.png'
import arrow from '../../nav-icons/arrow.png'
import './index.css'

function LeftSideNavigation() {
    return (
        <div>
            <div className='left-size-nav-home'>
            <img src={home} alt="" />Home
            </div>
            <div className='left-size-nav-coming-soon'>
            <img src={explore} alt="" /> Explore
            </div>
            <div className='left-size-nav-coming-soon'>
            <img src={video} alt="" /> Live
            </div>
            <div className='left-size-nav-coming-soon'>
            <img src={bolt} alt="" /> Activity
            </div>
            <div className='left-size-nav-coming-soon'>
            <img src={chat} alt="" /> Messages
            </div>
            <div className='left-size-nav-coming-soon'>
            <img src={mail} alt="" /> Inbox
            </div>
            <div className='left-size-nav-account' onClick=''>
            <img src={account} alt="" /> Account
            <img src={arrow} alt="" />
            </div>
            <div className='left-size-nav-coming-soon'>
            <img src={settings} alt="" /> Settings
            </div>
            <div className='left-size-nav-coming-soon'>
            <img src={store} alt="" /> BumblrMart
            </div>
            <div className='left-size-nav-coming-soon'>
            <img src={star} alt="" /> Go Ad-Free
            </div>
            <hr />
            <div>
            <img src={search} alt="" /> Search
            </div>
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
    )
}

export default LeftSideNavigation;