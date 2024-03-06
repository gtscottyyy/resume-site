import { Link, useLoaderData } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import styles from "~/styles/shared.css";
import ImageCarousel from "~/components/imagecarousel";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader = async () => {
  // Fetch data or return static data for the about page
  const data = {
    /* ... */
  };
  return data;
};

export default function About() {
  const data = useLoaderData();

  return (
    <div className="about-me-container">
      <div className="about-me-content">
        <div className="about-me-text">
          <h1 className="about-me-title">About Me</h1>
          <p className="about-me-blurb">
            {/* Your personal blurb goes here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            nisi vel ex finibus, vel facilisis tortor bibendum. Donec semper
            auctor justo, vel lobortis mi finibus ac. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Sed euismod nisi vel ex finibus,
            vel facilisis tortor bibendum. Donec semper auctor justo, vel
            lobortis mi finibus ac.
          </p>
        </div>
        <ImageCarousel />
      </div>
      <Link to="/" className="back-button">
        Back
      </Link>
    </div>
  );
}
