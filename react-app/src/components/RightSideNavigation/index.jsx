import React, { useState } from 'react';
import { FaGithub, FaAws, FaAt, FaLinkedin, FaEnvelope} from "react-icons/fa";
import "./index.css";

export function RightSideNavigation() {
  const [isEmailVisible, setIsEmailVisible] = useState(false);

  const emailMenu = () => {
    setIsEmailVisible(!isEmailVisible);
  };

  return (
    <div className='author-names-div'>
        <div>Andrew</div>
      <div className='Andrew'>
      <a href="https://github.com/andrew-khai">
                <FaGithub size={30} />
            </a>
            <a href="https://www.linkedin.com/in/andrew-khai/">
                <FaLinkedin size={30} />
            </a>
            <a href="#email" onClick={emailMenu}>
              <FaEnvelope size={30}/>
            </a>
            {isEmailVisible && (
                <p>
                    <FaEnvelope /> andrew-khai@gmail.com
                </p>
            )}
      </div>
      <div className='Jeffery'>
        <div>Jeffery</div>
      <a href="https://github.com/Jeffrey940421">
                <FaGithub size={30} />
            </a>
            <a href="https://www.linkedin.com/in/Jeffrey940421/">
                <FaLinkedin size={30} />
            </a>
            <a href="#email" onClick={emailMenu}>
              <FaEnvelope size={30}/>
            </a>
            {isEmailVisible && (
                <p>
                    <FaEnvelope /> Jeffrey940421@gmail.com
                </p>
            )}
      </div>
      <div className='Thomas'>
        <div>Thomas</div>
      <a href="https://github.com/ThomasYuan478">
                <FaGithub size={30} />
            </a>
            <a href="https://www.linkedin.com/in/ThomasYuan478/">
                <FaLinkedin size={30} />
            </a>
            <a href="#email" onClick={emailMenu}>
              <FaEnvelope size={30}/>
            </a>
            {isEmailVisible && (
                <p>
                    <FaEnvelope /> ThomasYuan478@gmail.com
                </p>
            )}
      </div>
      <div className='Tyler'>
        <div>Tyler</div>
      <a href="https://github.com/tmarks98">
                <FaGithub size={30} />
            </a>
            <a href="https://www.linkedin.com/in/tyler-marks-9b189987/">
                <FaLinkedin size={30} />
            </a>
            <a href="#email" onClick={emailMenu}>
              <FaEnvelope size={30}/>
            </a>
            {isEmailVisible && (
                <p>
                    <FaEnvelope /> tyleramarks@gmail.com
                </p>
            )}
      </div>
        <div>
        All images hosted by <a href='https://aws.amazon.com/'><FaAws size={20} /></a>
      </div>
    </div>
  );
}

export default RightSideNavigation;
