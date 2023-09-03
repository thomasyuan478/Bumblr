import { Link } from "react-router-dom";
import "./Footer.css"
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div id="footer-container">
        <div id="footer-icons-container">
          <div className="div-icons">
            <div className="footer-icons">
              <a className="footer-links" href="https://github.com/thomasyuan478/Bumblr" target="_blank">
                <div className="icon-labels">
                  GitHub
                </div>
                <FaGithub size={20} color="white" cursor="pointer" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
