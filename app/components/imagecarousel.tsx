import { useState } from "react";
import styles from "~/styles/shared.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
          {"<"}
        </button>
        <button onClick={handleNext} className="carousel-button">
          {">"}
        </button>
      </div>
    </div>
  );
}
