import { Link } from "@remix-run/react";
import image2 from "../public/images/headshot.jpeg";

export default function CustomNav() {
  return (
    <div className="navbar">
      <a href="/" className="home-link">
        <div className="circle-icon">
          <img src={image2} alt="Home" />
        </div>
      </a>
      <div className="navbar-info">
        <Link to={"/About"} prefetch="intent" className="navbar-listitem">
          1. about
        </Link>
        <Link to={"/Experience"} className="navbar-listitem">
          2. experience
        </Link>
        <Link to={"/Contact"} className="navbar-listitem">
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
