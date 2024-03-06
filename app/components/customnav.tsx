import { Link } from "@remix-run/react";

export default function CustomNav() {
  return (
    <div className="navbar">
      <div className="navbar-info">
        <Link to={"/About"} prefetch="intent" className="navbar-listitem">
          1. About
        </Link>
        <Link to={"/"} className="navbar-listitem">
          2. Experience
        </Link>
        <Link to={"/"} className="navbar-listitem">
          3. Work
        </Link>
        <Link to={"/"} className="navbar-listitem">
          4. Contact
        </Link>
        <button className="navbar-button">Resume</button>
      </div>
    </div>
  );
}
