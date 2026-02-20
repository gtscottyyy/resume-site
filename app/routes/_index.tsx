import { json, type LinksFunction, type MetaFunction } from "@remix-run/node";
import CustomNav from "../components/customnav";
import styles from "~/styles/shared.css";
import { useLoaderData } from "@remix-run/react";
import { connectToDatabase } from "~/utils/db.server";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";

export const meta: MetaFunction = () => {
  return [
    { title: "Scotty Henry — Software Developer" },
    { name: "description", content: "Software developer with 6+ years of experience in native iOS, React Native, and full-stack web. Based in Cincinnati, Ohio." },
    { property: "og:title", content: "Scotty Henry — Software Developer" },
    { property: "og:description", content: "Software developer with 6+ years of experience in native iOS, React Native, and full-stack web." },
    { property: "og:image", content: "https://res.cloudinary.com/dwbtwz6ux/image/upload/v1771536953/headshot_uijqhm.jpg" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Scotty Henry — Software Developer" },
    { name: "twitter:description", content: "Software developer with 6+ years of experience in native iOS, React Native, and full-stack web." },
    { name: "twitter:image", content: "https://res.cloudinary.com/dwbtwz6ux/image/upload/v1771536953/headshot_uijqhm.jpg" },
  ];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader() {
  const { copy } = await connectToDatabase();
  return json({ copy });
}

export default function Index() {
  useScrollAnimation();
  const copy = useLoaderData<typeof loader>();
  const resumeCopy = copy.copy;
  return (
    <div>
      <CustomNav />
      <div className="overview">
        <div className="content" data-animate>
          <div className="subtitle">{resumeCopy?.home_blurb}</div>
          <div className="title">{resumeCopy?.home_title}</div>
          <div className="title-secondary">{resumeCopy?.home_subtitle}</div>
          <div className="paragraph">
            <p>{resumeCopy?.home_body}</p>
          </div>
          <a href="https://github.com/gtscottyyy/resume-site" className="button" target="_blank" rel="noopener noreferrer">
            {resumeCopy?.home_button}
          </a>
        </div>
      </div>
    </div>
  );
}
