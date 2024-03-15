import type { LinksFunction, MetaFunction } from "@remix-run/node";
import CustomNav from "../components/customnav";
import styles from "~/styles/shared.css";
import HomeContent from "~/components/homecontent";

export const meta: MetaFunction = () => {
  return [
    { title: "Scotty Henry Home" },
    {
      name: "Home page/resume for Scotty Henry",
      content: "Scotty Henry Resume",
    },
  ];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Index() {
  return (
    <div>
      <CustomNav />
      <HomeContent />
    </div>
  );
}
