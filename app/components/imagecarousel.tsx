import { useState } from "react";
import { LinksFunction } from "@remix-run/node";
import styles from "~/styles/shared.css";
import image1 from "../public/images/goobs_smile.jpg";
import image2 from "../public/images/family2.png";
import image3 from "../public/images/goobs_work2.jpg";
import image4 from "../public/images/family.jpg";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const images = [image1, image2, image3, image4];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container">
      <img
        src={images[currentIndex]}
        alt="Carousel"
        className="carousel-image"
      />
      <div className="carousel-button-container">
        <button onClick={handlePrevious} className="carousel-button">
          {String.fromCharCode(60)}
        </button>
        <button onClick={handleNext} className="carousel-button">
          {String.fromCharCode(62)}
        </button>
      </div>
    </div>
  );
}
