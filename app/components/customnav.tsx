import { Link } from "@remix-run/react";

export default function CustomNav() {
  return (
    <div className="navbar">
      <div className="navbar-info">
        <Link to={"/About"} prefetch="intent" className="navbar-listitem">
          1. About
        </Link>
        <Link to={"/Experience"} className="navbar-listitem">
          2. Experience
        </Link>
        <Link to={"/Work"} className="navbar-listitem">
          3. Work
        </Link>
        <Link to={"/Contact"} className="navbar-listitem">
          4. Contact
        </Link>
        <a
          href="https://drive.google.com/file/d/1aWUoPr_HfWGbzKeQfT76OFfs6T5c6kOe/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="navbar-button">Resume</button>
        </a>
      </div>
    </div>
  );
}
