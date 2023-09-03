import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNonClosingModal } from "../../context/NonClosingModal";
import LogOutModal from "../LogOutModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { setModalContent } = useNonClosingModal()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };


  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      <p className="login-signup-buttons-container" ref={ulRef}>
        {user ? (
          <>
            {/* <li>{user.username}</li>
            <li>{user.email}</li> */}
            <div id='user-nav-search-container'>
              <input
                type='text'
                placeholder='Search Bumblr'
                disabled={true}
              ></input>
              <button
              onClick={() => setModalContent(<LogOutModal />)}
              >Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <> </>
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </p>
    </div>
  );
}

export default ProfileButton;
