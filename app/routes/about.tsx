import styles from "~/styles/about.css";
import sharedStyles from "~/styles/shared.css";
import ImageCarousel from "~/components/imagecarousel";
import CustomNav from "~/components/customnav";
import { connectToDatabase } from "~/utils/db.server";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useScrollAnimation } from "~/hooks/useScrollAnimation";

export const meta: MetaFunction = () => {
  return [
    { title: "About — Scotty Henry" },
    { name: "description", content: "Software developer from Cincinnati, Ohio. 6+ years across native iOS, React Native, and full-stack web." },
    { property: "og:title", content: "About — Scotty Henry" },
    { property: "og:description", content: "Software developer from Cincinnati, Ohio. 6+ years across native iOS, React Native, and full-stack web." },
    { property: "og:image", content: "https://res.cloudinary.com/dwbtwz6ux/image/upload/v1771536953/headshot_uijqhm.jpg" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "About — Scotty Henry" },
    { name: "twitter:description", content: "Software developer from Cincinnati, Ohio. 6+ years across native iOS, React Native, and full-stack web." },
    { name: "twitter:image", content: "https://res.cloudinary.com/dwbtwz6ux/image/upload/v1771536953/headshot_uijqhm.jpg" },
  ];
};

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
  useScrollAnimation();
  const copy = useLoaderData<typeof loader>();
  const aboutCopy = copy.copy;
  return (
    <div>
      <CustomNav />
      <div className="about-me-container">
        <div className="about-me-content">
          <div className="about-me-text" data-animate>
            <div className="about-subtitle">{aboutCopy?.about_blurb}</div>
            <div className="about-me-title">{aboutCopy?.about_title}</div>
            <p className="about-me-blurb">{aboutCopy?.about_body}</p>
          </div>
          <div className="carousel" data-animate style={{ "--animate-delay": "0.15s" } as React.CSSProperties}>
            <ImageCarousel images={aboutCopy?.carousel_images ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
