import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import "./AccountSetting.css"
import { useState, useRef, useEffect } from "react";
import AvatarEditor from 'react-avatar-editor'
import { updateProfile } from "../../store/session";
import { ChangePassword } from "../ChangePassword";
import { useNonClosingModal } from "../../context/NonClosingModal";

export function AccountSetting() {
  const { setModalContent } = useNonClosingModal()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [editMode, setEditMode] = useState(false)
  const [bannerPicUrl, setBannerPicUrl] = useState(user ? user.bannerPic : "")
  const [currBannerPicUrl, setCurrBannerPicUrl] = useState(user ? user.bannerPic : "")
  const [bannerPic, setBannerPic] = useState("")
  const [currBannerPic, setCurrBannerPic] = useState("")
  const [profilePicUrl, setProfilePicUrl] = useState(user ? user.profilePic : "")
  const [currProfilePicUrl, setCurrProfilePicUrl] = useState(user ? user.profilePic : "")
  const [profilePic, setProfilePic] = useState("")
  const [currProfilePic, setCurrProfilePic] = useState("")
  const [nickname, setNickname] = useState(user && user.nickname ? user.nickname : "")
  const [currNickname, setCurrNickname] = useState(user && user.nickname ? user.nickname : "")
  const [bio, setBio] = useState(user && user.bio ? user.bio : "")
  const [currBio, setCurrBio] = useState(user && user.bio ? user.bio : "")
  const [bannerScale, setBannerScale] = useState(0)
  const [profileScale, setProfileScale] = useState(0)
  const [username, setUsername] = useState(user ? user.username : "")
  const [currUsername, setCurrUsername] = useState(user ? user.username : "")
  const [email, setEmail] = useState(user ? user.email : "")
  const [currEmail, setCurrEmail] = useState(user ? user.email : "")
  const [editUsername, setEditUsername] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [serverErrors, setServerErrors] = useState([])

  const bannerRef = useRef()
  const profileRef = useRef()
  const bannerUploadRef = useRef()
  const profileUploadRef = useRef()

  const handleSave = async () => {
    if (bannerRef) {
      const bannerScaled = bannerRef.current.getImage()
      bannerScaled.toBlob(blob => {
        const image = new File([blob], "banner", { lastModified: new Date().getTime(), type: bannerPic ? bannerPic.type : "image/png" })
        setBannerPic(image)
        setCurrBannerPic(image)
        setBannerPicUrl(URL.createObjectURL(image))
        setCurrBannerPicUrl(URL.createObjectURL(image))
      })
    }
    if (profileRef) {
      const profileScaled = profileRef.current.getImage()
      profileScaled.toBlob(blob => {
        const image = new File([blob], "profile", { lastModified: new Date().getTime(), type: bannerPic ? bannerPic.type : "image/png" })
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let bannerUrl = user.bannerPic
    let profileUrl = user.profilePic

    if (currBannerPic) {
      const bannerFormData = new FormData()
      const ext = currBannerPic.type.split("/")[1]
      bannerFormData.append("image", currBannerPic, "banner." + ext)
      const bannerRes = await fetch("api/images/new", {
        method: "POST",
        body: bannerFormData
      })
      if (bannerRes.ok) {
        const resData = await bannerRes.json()
        bannerUrl = resData.url
      } else if (bannerRes.status < 500) {
        const resData = await bannerRes.json()
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
    }

    if (currProfilePic) {
      const profileFormData = new FormData()
      const ext = currProfilePic.type.split("/")[1]
      profileFormData.append("image", currProfilePic, "profile." + ext)
      const profileRes = await fetch("api/images/new", {
        method: "POST",
        body: profileFormData
      })
      if (profileRes.ok) {
        const resData = await profileRes.json()
        profileUrl = resData.url
      } else if (profileRes.status < 500) {
        const resData = await profileRes.json()
        if (resData.errors) {
          setServerErrors((prev) => {
            prev = resData.errors
            return [...prev]
          })
        }
        return
      } else {
        setServerErrors((prev) => ["An error occurred. Please try again."])
        return
      }
    }

    const new_profile = {
      username: currUsername,
      email: currEmail,
      nickname: currNickname,
      bio: currBio,
      banner_pic: bannerUrl,
      profile_pic: profileUrl
    }

    const data = await dispatch(updateProfile(user.id, new_profile))
    if (data) {
      setServerErrors(data)
    } else {
      history.push("/")
    }
  }

  useEffect(() => {
    const errors = { username: [], email: [] }

    if (username.length < 6 || username.length > 40) {
      errors.username.push("Username must be at least 6 characters long and no longer than 40 characters")
    }

    if (!email) {
      errors.email.push("Email is required")
    }

    if (!String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      errors.email.push("Email is invalid")
    }

    setValidationErrors(errors)
  }, [username, email])

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="account-setting-container">
      <div className="account-setting-container_background">
        {
          editMode ?
            <AvatarEditor
              ref={bannerRef}
              image={bannerPicUrl.startsWith("blob") ? bannerPicUrl : bannerPicUrl + "?dummy=" + String(new Date().getTime())}
              width={620}
              height={350}
              border={0}
              scale={1 + bannerScale / 100}
              crossOrigin="anonymous"
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
                image={profilePicUrl.startsWith("blob") ? profilePicUrl : profilePicUrl + "?dummy=" + String(new Date().getTime())}
                width={90}
                height={90}
                border={0}
                scale={1 + profileScale / 100}
                crossOrigin="anonymous"
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
                  disabled={validationErrors.username.length}
                >
                  Done
                </button>
              </div>
              <div className="account-setting-container_validation-error">
                {validationErrors.username && validationErrors.username.map((error, i) => {
                  return (
                    <span key={i}><i className="fa-solid fa-triangle-exclamation" /> {error}</span>
                  )
                })}
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
                  disabled={validationErrors.email.length}
                >
                  Done
                </button>
              </div>
              <div className="account-setting-container_validation-error">
                {validationErrors.email && validationErrors.email.map((error, i) => {
                  return (
                    <span key={i}><i className="fa-solid fa-triangle-exclamation" /> {error}</span>
                  )
                })}
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
          onClick={(e) => {
            setChangePassword(true)
            setModalContent(<ChangePassword user={user} setChangePassword={setChangePassword} />)
          }}
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
      <div className={`account-setting-container_server-error ${serverErrors.length ? "show" : "hide"}`}>
        {serverErrors.map((error, i) => {
          return (
            <span key={i}><i className="fa-solid fa-triangle-exclamation" /> {error}</span>
          )
        })}
      </div>
      <div className="account-setting-container_submit">
        <button
          className="account-setting-container_submit"
          onClick={handleSubmit}
          disabled={editMode || editEmail || editUsername || editUsername || changePassword}
        >
          Submit Changes
        </button>
      </div>
    </div>
  )
}
