import { Link, useLocation, useRouteLoaderData } from "@remix-run/react";

export default function CustomNav() {
  const location = useLocation();
  const root = useRouteLoaderData("root") as { headshot_url: string } | undefined;

  return (
    <div className="navbar">
      <Link to="/" className="home-link">
        <div className="circle-icon">
          <img src={root?.headshot_url} alt="Home" />
        </div>
      </Link>
      <div className="navbar-info">
        <Link
          to="/about"
          className={`navbar-listitem ${
            location.pathname === "/about" ? "active" : ""
          }`}
        >
          1. about
        </Link>
        <Link
          to="/experience"
          className={`navbar-listitem ${
            location.pathname === "/experience" ? "active" : ""
          }`}
        >
          2. experience
        </Link>
        <Link
          to="/contact"
          className={`navbar-listitem ${
            location.pathname === "/contact" ? "active" : ""
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
