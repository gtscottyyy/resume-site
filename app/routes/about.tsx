import styles from "~/styles/about.css";
import sharedStyles from "~/styles/shared.css";
import ImageCarousel from "~/components/imagecarousel";
import CustomNav from "~/components/customnav";

export function links() {
  return [
    { rel: "stylesheet", href: sharedStyles },
    { rel: "stylesheet", href: styles },
  ];
}
export const loader = async () => {
  // Fetch data or return static data for the about page
  const data = {
    /* ... */
  };
  return data;
};

export default function About() {
  return (
    <div>
      <CustomNav />
      {/* Todo: Delete some of these */}
      <div className="about-me-container">
        <div className="about-me-content">
          <div className="about-me-text">
            <h1 className="about-me-title">About Me</h1>
            <p className="about-me-blurb">
              {/* Your personal blurb goes here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod nisi vel ex finibus, vel facilisis tortor bibendum. Donec
              semper auctor justo, vel lobortis mi finibus ac. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed euismod nisi vel ex
              finibus, vel facilisis tortor bibendum. Donec semper auctor justo,
              vel lobortis mi finibus ac.
            </p>
          </div>
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
}
