import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./AccountSetting.css"
import { useState, useRef, useEffect } from "react";
import AvatarEditor from 'react-avatar-editor'

export function AccountSetting() {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [editMode, setEditMode] = useState(false)
  const [bannerPicUrl, setBannerPicUrl] = useState(user.bannerPic)
  const [currBannerPicUrl, setCurrBannerPicUrl] = useState(user.bannerPic)
  const [bannerPic, setBannerPic] = useState("")
  const [currBannerPic, setCurrBannerPic] = useState("")
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePic)
  const [currProfilePicUrl, setCurrProfilePicUrl] = useState(user.profilePic)
  const [profilePic, setProfilePic] = useState("")
  const [currProfilePic, setCurrProfilePic] = useState("")
  const [nickname, setNickname] = useState(user.nickname ? user.nickname : "")
  const [currNickname, setCurrNickname] = useState(user.nickname ? user.nickname : "")
  const [bio, setBio] = useState(user.bio ? user.bio : "")
  const [currBio, setCurrBio] = useState(user.bio ? user.bio : "")
  const [bannerScale, setBannerScale] = useState(0)
  const [profileScale, setProfileScale] = useState(0)
  const [username, setUsername] = useState(user.username)
  const [currUsername, setCurrUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [currEmail, setCurrEmail] = useState(user.email)
  const [editUsername, setEditUsername] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [changePassword, setChangePassword] = useState(false)

  const bannerRef = useRef()
  const profileRef = useRef()
  const bannerUploadRef = useRef()
  const profileUploadRef = useRef()

  const handleSave = async () => {
    if (bannerRef) {
      const bannerScaled = bannerRef.current.getImage()
      bannerScaled.toBlob(image => {
        setBannerPic(image)
        setCurrBannerPic(image)
        setBannerPicUrl(URL.createObjectURL(image))
        setCurrBannerPicUrl(URL.createObjectURL(image))
      }, bannerPic.type)
    }
    if (profileRef) {
      const profileScaled = profileRef.current.getImage()
      profileScaled.toBlob(image => {
        setProfilePic(image)
        setCurrProfilePic(image)
        setProfilePicUrl(URL.createObjectURL(image))
        setCurrProfilePicUrl(URL.createObjectURL(image))
      }, profilePic.type)
    }
    setCurrNickname(nickname)
    setCurrBio(bio)
    setEditMode(false)
    setBannerScale(0)
    setProfileScale(0)
  }

  if (!user) {
    return history.replace("/error/401");
  }

  return (
    <div className="account-setting-container">
      <div className="account-setting-container_background">
        {
          editMode ?
            <AvatarEditor
              ref={bannerRef}
              image={bannerPicUrl}
              width={620}
              height={350}
              border={0}
              scale={1 + bannerScale / 100}
            />
            :
            <img src={bannerPicUrl} />
        }
      </div>
      <div className="account-setting-container_head">
        <span className="account-setting-container-username">{editMode ? "Edit Appearance" : user.username}</span>
        {
          !editMode ?
            <button
              className="account-setting-container-edit_button"
              onClick={() => setEditMode(true)}
            >
              Edit Appearance
            </button> :
            <>
              <input type="range" min="0" max="100" step="1" value={bannerScale} onChange={(e) => setBannerScale(e.target.value)}></input>
              <div className="account-setting-container-edit_buttons">
                <button
                  className="account-setting-container-edit_button"
                  onClick={() => {
                    setEditMode(false)
                    setBannerPicUrl(currBannerPicUrl)
                    setProfilePicUrl(currProfilePicUrl)
                    setNickname(currNickname)
                    setBio(currBio)
                  }}
                >
                  Cancel
                </button>
                <button
                  className="account-setting-container-edit_button"
                  onClick={handleSave}
                >
                  Done
                </button>
              </div>
            </>
        }
      </div>
      {
        editMode ?
          <>
            <input
              ref={bannerUploadRef}
              type="file"
              className="hide"
              accept="image/*"
              multiple={false}
              name="banner"
              onChange={(e) => {
                setBannerPic(e.target.files[0])
                setBannerPicUrl(URL.createObjectURL(e.target.files[0]))
              }}
              onClick={(e) => e.target.value = null}
            />
            <label htmlFor="banner">
              <button
                className="account-setting-container-upload_button"
                id="account-setting-container-banner_upload_button"
                onClick={(e) => {
                  e.preventDefault();
                  bannerUploadRef.current.click();
                }}
              >
                <i class="fa-solid fa-cloud-arrow-up" />
              </button>
            </label>
          </> :
          null
      }
      <div className="account-setting-container-profile_pic">
        {
          editMode ?
            <>
              <AvatarEditor
                ref={profileRef}
                image={profilePicUrl}
                width={90}
                height={90}
                border={0}
                scale={1 + profileScale / 100}
              />
              <input
                ref={profileUploadRef}
                type="file"
                className="hide"
                accept="image/*"
                multiple={false}
                name="profile"
                onChange={(e) => {
                  setProfilePic(e.target.files[0])
                  setProfilePicUrl(URL.createObjectURL(e.target.files[0]))
                }}
                onClick={(e) => e.target.value = null}
              />
              <label htmlFor="profile">
                <button
                  className="account-setting-container-upload_button"
                  id="account-setting-container-profile_pic_upload_button"
                  onClick={(e) => {
                    e.preventDefault();
                    profileUploadRef.current.click();
                  }}
                >
                  <i class="fa-solid fa-cloud-arrow-up" />
                </button>
              </label>
            </> :
            <img className="account-setting-container_profile-pic" src={profilePicUrl} />
        }
      </div>
      <div className="account-setting-container-profile">
        {
          editMode ?
            <>
              <input className="account-setting-container_profile-pic-slider" type="range" min="0" max="100" step="1" value={profileScale} onChange={(e) => setProfileScale(e.target.value)}></input>
              <input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              <button><i class="fa-solid fa-award" />Badge</button>
              <textarea placeholder="Description" value={bio} onChange={(e) => setBio(e.target.value)} />
            </> :
            <>
              <span>{nickname}</span>
              <button><i class="fa-solid fa-award" /> Add badges</button>
              <span>{bio}</span>
            </>
        }
      </div>
      <div className="account-setting-container_username">
        <span><b>Username</b></span>
        {
          editUsername ?
            <>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <div>
                <button
                  onClick={(e) => {
                    setUsername(currUsername)
                    setEditUsername(false)
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    setCurrUsername(username)
                    setEditUsername(false)
                  }}
                >
                  Done
                </button>
              </div>
            </> :
            <>
              <span>{username}</span>
              <button
                onClick={(e) => setEditUsername(true)}
              >
                <i class="fa-solid fa-pen" />
              </button>
            </>
        }

      </div>
      <div className="account-setting-container_email">
        <span><b>Email</b></span>
        {
          editEmail ?
            <>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              <div>
                <button
                  onClick={(e) => {
                    setEmail(currEmail)
                    setEditEmail(false)
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    setCurrEmail(email)
                    setEditEmail(false)
                  }}
                >
                  Done
                </button>
              </div>
            </> :
            <>
              <span>{email}</span>
              <button
                onClick={(e) => setEditEmail(true)}
              >
                <i class="fa-solid fa-pen" />
              </button>
            </>
        }
      </div>
      <div className="account-setting-container_password">
        <span><b>Password</b></span>
        <span>••••••••••</span>
        <button
          onClick={(e) => setChangePassword(true)}
        >
          <i class="fa-solid fa-pen" />
        </button>
      </div>
      <div className="account-setting-container_account">
        <span><b>Account</b></span>
        <button
          onClick={(e) => setChangePassword(true)}
        >
          Delete Account
        </button>
      </div>
      <div className="account-setting-container_submit">
        <button
          className="account-setting-container_submit"
        >
          Submit Changes
        </button>
      </div>
    </div>
  )
}
