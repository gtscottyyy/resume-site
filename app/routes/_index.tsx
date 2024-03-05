import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "~/styles/shared.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Index() {
  return (
    <div>
      <div className="navbar">
        <div className="navbar-info">
          <div className="navbar-name">John Doe</div>
          <div>(123) 456-7890</div>
          <div>1234 Oakland Road, Loveland, Ohio, 45069</div>
        </div>
      </div>
    </div>
  );
}
