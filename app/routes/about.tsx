import styles from "~/styles/about.css";
import sharedStyles from "~/styles/shared.css";
import ImageCarousel from "~/components/imagecarousel";
import CustomNav from "~/components/customnav";
import { connectToDatabase } from "~/utils/db.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function links() {
  return [
    { rel: "stylesheet", href: sharedStyles },
    { rel: "stylesheet", href: styles },
  ];
}

export async function loader() {
  const { copy } = await connectToDatabase();

  return json({ copy });
}

export default function About() {
  const copy = useLoaderData<typeof loader>();
  const aboutCopy = copy.copy;
  return (
    <div>
      <CustomNav />
      <div className="about-me-container">
        <div className="about-me-content">
          <div className="about-me-text">
            <div className="about-subtitle">{aboutCopy?.about_blurb}</div>
            <div className="about-me-title">{aboutCopy?.about_title}</div>
            <p className="about-me-blurb">{aboutCopy?.about_body}</p>
          </div>
          <div className="carousel">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
