import React, { useState } from 'react';
import { FaGithub, FaAws, FaAt, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./index.css";

export function RightSideNavigation() {
  const [isEmailVisible, setIsEmailVisible] = useState(false);

  const emailMenu = () => {
    setIsEmailVisible(!isEmailVisible);
  };

  return (
    <div id='right-side-container'>
      <div id='right-side-dev-container'>
        <div className='author-names-div'>
          <span>Meet the Developers</span>
          <div className='Andrew'>
            <img src="/images/avatar/avatar1.png" />
            <div className='author-names-info'>
              <div>Andrew Chan</div>
              <a href="https://github.com/andrew-khai">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/andrew-khai/">
                <FaLinkedin size={20} />
              </a>
              <a href="#email" onClick={emailMenu}>
                <FaEnvelope size={20} />
              </a>
              {isEmailVisible && (
                <p>
                  <FaEnvelope /> 1andrew.khai@gmail.com
                </p>
              )}
            </div>
          </div>
          <div className='Jeffery'>
            <img src="/images/avatar/avatar5.png" />
            <div className='author-names-info'>
              <div>Jeffery Zhang</div>
              <a href="https://github.com/Jeffrey940421">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/Jeffrey940421/">
                <FaLinkedin size={20} />
              </a>
              <a href="#email" onClick={emailMenu}>
                <FaEnvelope size={20} />
              </a>
              {isEmailVisible && (
                <p>
                  <FaEnvelope /> Jeffrey940421@gmail.com
                </p>
              )}
            </div>
          </div>
          <div className='Thomas'>
            <img src="/images/avatar/avatar2.png" />
            <div className='author-names-info'>
              <div>Thomas Yuan</div>
              <a href="https://github.com/ThomasYuan478">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/ThomasYuan478/">
                <FaLinkedin size={20} />
              </a>
              <a href="#email" onClick={emailMenu}>
                <FaEnvelope size={20} />
              </a>
              {isEmailVisible && (
                <p>
                  <FaEnvelope /> ThomasYuan478@gmail.com
                </p>
              )}
            </div>
          </div>
          <div className='Tyler'>
            <img src="/images/avatar/avatar8.png" />
            <div className='author-names-info'>
              <div>Tyler Marks</div>
              <a href="https://github.com/tmarks98">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/tyler98">
                <FaLinkedin size={20} />
              </a>
              <a href="#email" onClick={emailMenu}>
                <FaEnvelope size={20} />
              </a>
              {isEmailVisible && (
                <p>
                  <FaEnvelope /> tyleramarks@gmail.com
                </p>
              )}
            </div>
          </div>
          <div className='aws-message-container'>
            All images hosted by <a href='https://aws.amazon.com/'><FaAws size={30} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSideNavigation;
