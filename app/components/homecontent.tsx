import { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import styles from "~/styles/shared.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function HomeContent() {
  return (
    <div className="overview">
      <div className="content">
        <div className="subtitle">hi, my name is</div>
        <div className="title">Scotty Henry</div>
        <div className="sameTitle">I like to build stuff</div>
        <div className="paragraph">
          <p>
            Greetings, fellow humans and sentient code snippets! Im a software
            engineer whos passion for developing knows no bounds. Ive seen a
            lot: from spaghetti code that could double as abstract art to
            elegant architectures so clean you could eat off them (whatever that
            means). I enjoy wearing many hats – developer, debugger, coffee
            enthusiast, and occasional meme generator. But dont worry, Ive got a
            hat rack for all of them.
          </p>
        </div>
        <Link to="https://github.com/gtscottyyy/resume-site" className="button">
          Check out this code!
        </Link>
      </div>
    </div>
  );
}
