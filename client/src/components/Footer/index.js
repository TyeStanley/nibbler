import { useEffect, useState } from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 1200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    })
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer>
      <div className="borderOutline">
        <div className="GitHubNameContainer">&copy;2022 by{' '}
          <a href="https://github.com/millerchase" target="blank">
            <FontAwesomeIcon icon={faGithub} /> Chase Miller,{' '}
          </a>
          <a href="https://github.com/macpat83" target="blank">
            <FontAwesomeIcon icon={faGithub} /> McKinley Wiltz,{' '}
          </a>
          <a href="https://github.com/SD-github21" target="blank">
            <FontAwesomeIcon icon={faGithub} /> Sapana Donde,{' '}
          </a>
          <a href="https://github.com/Azariill" target="blank">
            <FontAwesomeIcon icon={faGithub} /> Scott Heier,{' '}
          </a>
          <a href="https://github.com/TyeStanley" target="blank">
            <FontAwesomeIcon icon={faGithub} /> Tye Stanley
          </a>
        </div>
      </div>

      {showButton && (
        <button 
          onClick={scrollToTop}
          className="back-to-top">
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </footer>
  )
} 

export default Footer;