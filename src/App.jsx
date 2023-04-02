import { useState, useEffect } from "react";
import { Footer } from "./components/Footer";
// Material UI
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import images from "./data/images";

export const App = () => {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode") || false)
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.body.style.backgroundColor = "#181818";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [darkMode]);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex + images.length - 1) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setIndex(index);
  };

  useEffect(() => {
    let intervalId;
    if (autoplay) {
      intervalId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [autoplay]);

  let currentImage = images[index];

  return (
    <>
      <div className="darkMode-toggle">
        <input
          onClick={() => setDarkMode(!darkMode)}
          type="checkbox"
          className="checkbox"
          id="checkbox"
          checked={darkMode}
        />
        <label
          for="checkbox"
          className="label"
          style={{ border: darkMode && "1px solid grey" }}
        >
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
          <div className="ball"></div>
        </label>
      </div>
      <div
        className="container"
        style={{ backgroundColor: darkMode && "#121212" }}
      >
        <div className="image-slider">
          <img src={currentImage.src} alt={currentImage.title} id="mainImage" />
          <div className="controls">
            <ArrowLeftIcon
              onClick={handlePrev}
              sx={{ fontSize: "80px", color: darkMode && "white" }}
            />
            <div className="thumbnails">
              {images.map((image, i) => (
                <img
                  key={image.id}
                  onClick={() => handleThumbnailClick(i)}
                  src={image.src}
                  alt={image.title}
                  style={{ cursor: "pointer" }}
                  className={`thumbnail ${currentImage === image && "active"}`}
                />
              ))}
            </div>
            <ArrowRightIcon
              onClick={handleNext}
              sx={{
                fontSize: "80px",
                cursor: "pointer",
                color: darkMode && "white",
              }}
            />
          </div>
          <div className="autoplay">
            {autoplay ? (
              <PauseCircleIcon
                style={{
                  fontSize: "80px",
                  cursor: "pointer",
                  color: darkMode && "white",
                }}
                onClick={() => setAutoplay(!autoplay)}
              />
            ) : (
              <PlayCircleIcon
                style={{
                  fontSize: "80px",
                  cursor: "pointer",
                  color: darkMode && "white",
                }}
                onClick={() => setAutoplay(!autoplay)}
              />
            )}
          </div>
        </div>
        <div className="image-info">
          <h1 id="title" style={{ color: darkMode && "#fff" }}>
            {currentImage.title}
          </h1>
          <p id="description" style={{ color: darkMode && "#b3b3b3" }}>
            {currentImage.description}
          </p>
        </div>
      </div>
      <Footer darkMode={darkMode}></Footer>
    </>
  );
};
