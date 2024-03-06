import { LinksFunction } from "@remix-run/node";
import styles from "~/styles/shared.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function HomeContent() {
  return (
    <div className="overview">
      <div className="content">
        <div className="subtitle">Hi, my name is</div>
        <div className="title">Scotty Henry</div>
        <div className="sameTitle">I buidl things</div>
        <div className="paragraph">
          <p>
            I'm a software engineer who has navigated through many code bases
            utilizing many frameworks and languages. Self proclaimed jack of all
            trades master of none I can be effective in most languages with
            minimum ramp up. Always learning new things and passionate about
            tech while hoping to move the needle in a meaningful way at some
            point.
          </p>
        </div>
        <button className="button">Check out my code!</button>
      </div>
    </div>
  );
}
