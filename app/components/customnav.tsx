import { Link, useLocation } from "@remix-run/react";
import image2 from "../public/images/headshot.jpeg";

export default function CustomNav() {
  const location = useLocation(); // Get the current location

  return (
    <div className="navbar">
      <Link to="/" className="home-link">
        <div className="circle-icon">
          <img src={image2} alt="Home" />
        </div>
      </Link>
      <div className="navbar-info">
        <Link
          to={"/About"}
          className={`navbar-listitem ${
            location.pathname === "/About" ? "active" : ""
          }`}
        >
          1. about
        </Link>
        <Link
          to={"/Experience"}
          className={`navbar-listitem ${
            location.pathname === "/Experience" ? "active" : ""
          }`}
        >
          2. experience
        </Link>
        <Link
          to={"/Contact"}
          className={`navbar-listitem ${
            location.pathname === "/Contact" ? "active" : ""
          }`}
        >
          3. contact
        </Link>
        <a
          href="https://drive.google.com/file/d/1aWUoPr_HfWGbzKeQfT76OFfs6T5c6kOe/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="navbar-button">resume</button>
        </a>
      </div>
    </div>
  );
}
