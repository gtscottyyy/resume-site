import { json, type LinksFunction, type MetaFunction } from "@remix-run/node";
import CustomNav from "../components/customnav";
import styles from "~/styles/shared.css";
import { useLoaderData } from "@remix-run/react";
import { connectToDatabase } from "~/utils/db.server";

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

export async function loader() {
  const { copy } = await connectToDatabase();

  return json({ copy });
}

export default function Index() {
  const copy = useLoaderData<typeof loader>();
  const resumeCopy = copy.copy;
  return (
    <div>
      <CustomNav />
      <div className="overview">
        <div className="content">
          <div className="subtitle">{resumeCopy?.home_blurb}</div>
          <div className="title">{resumeCopy?.home_title}</div>
          <div className="title-secondary">{resumeCopy?.home_subtitle}</div>
          <div className="paragraph">
            <p>{resumeCopy?.home_body}</p>
          </div>
          <a
            href="https://github.com/gtscottyyy/resume-site"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            {resumeCopy?.home_button}
          </a>
        </div>
      </div>
    </div>
  );
}
