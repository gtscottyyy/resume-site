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

export default function About() {
  return (
    <div>
      <CustomNav />
      <div className="about-me-container">
        <div className="about-me-content">
          <div className="about-me-text">
            <div className="about-subtitle">a little bit</div>
            <div className="about-me-title">About Me</div>
            <p className="about-me-blurb">
              Enthusiastic and results-driven software developer with four years
              of experience, hailing from suburbs of vibrant Cincinnati, Ohio.
              My journey in the tech industry has been fueled by a passion for
              innovation and a relentless drive to stay at the forefront of
              technological advancements.
            </p>
            <p className="about-me-blurb">
              A tech aficionado at heart, I thrive on staying abreast of the
              latest technological trends and breakthroughs. My curiosity drives
              me to explore emerging technologies, ensuring that my skill set
              remains cutting-edge and adaptable to the ever-evolving landscape
              of the software development field.
            </p>
            <p className="about-me-blurb">
              Beyond the realm of code, I find joy in diverse interests. An avid
              anime enthusiast, I appreciate the creativity and storytelling
              that the medium offers. In the gaming world, Im drawn to FPS video
              games, relishing the challenge of strategic gameplay and immersive
              experiences.
            </p>
            <p className="about-me-blurb">
              While dedicated to my professional growth, I value a healthy
              work-life balance. Spending quality time with family and my dog
              Goobs are my favorite things.
            </p>
          </div>
          <div className="carousel">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
