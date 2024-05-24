import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../styles/lowerNavbar.css";
import {
  faGlobe,
  faUmbrellaBeach,
  faCampground,
  faCity,
  faWaterLadder,
  faPersonSkiing,
  faSnowflake,
  faTractor,
  faWheatAwn,
  faGem,
  faFire,
  faSun,
  faSailboat,
} from "@fortawesome/free-solid-svg-icons";
import CastleIcon from "@mui/icons-material/Castle";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import WavesIcon from "@mui/icons-material/Waves";
import HouseIcon from "@mui/icons-material/House";

const LowerNavbar = ({ setSelectedCategory }) => {
  const [carouselHover, setCarouselHover] = useState(false);
  const [isGrabbed, setIsGrabbed] = useState(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 10,
    },
    smallDesktop: {
      breakpoint: { max: 1420, min: 1117 },
      items: 6,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
  };

  const iconSize = "xl";

  const carouselMouseEnterHandler = () => {
    setCarouselHover(true);
  };
  const carouselLeaveEnterHandler = () => {
    setCarouselHover(false);
    setIsGrabbed(false);
  };

  const carouselMouseDownHandler = () => {
    setIsGrabbed(true);
  };

  const carouselMouseUpHandler = () => {
    setIsGrabbed(false);
  };

  const transition = "all 500ms ease-in-out";

  return (
    <div
      onMouseEnter={carouselMouseEnterHandler}
      onMouseLeave={carouselLeaveEnterHandler}
      onMouseDown={carouselMouseDownHandler}
      onMouseUp={carouselMouseUpHandler}
      className="nav-carousel-wrapper"
      // style={isGrabbed ? { cursor: "grabbing" } : { cursor: "default" }}
    >
      <Carousel
        responsive={responsive}
        containerClass="carousel"
        sliderClass={`slider ${isGrabbed ? "grabbing" : ""}`}
        customTransition={transition}
        removeArrowOnDeviceType={["mobile"]}
        partialVisible={true}
        className="nav-carousel"
      >
        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("All")}
        >
          <FontAwesomeIcon icon={faGlobe} size={iconSize} className="icon" />
          <p>All</p>
        </div>
        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("Beachfront")}
        >
          <FontAwesomeIcon
            icon={faUmbrellaBeach}
            size={iconSize}
            className="icon"
          />
          <p>Beachfront</p>
        </div>
        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("Desert")}
        >
          <FontAwesomeIcon icon={faSun} size={iconSize} className="icon" />

          <p>Desert</p>
        </div>
        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("lake")}
        >
          <FontAwesomeIcon icon={faTractor} size={iconSize} className="icon" />

          <p>Farms</p>
        </div>
        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("Ski-in/out")}
        >
          <FontAwesomeIcon
            icon={faPersonSkiing}
            size={iconSize}
            className="icon"
          />

          <p>Ski-in/out</p>
        </div>
        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("Camping")}
        >
          <FontAwesomeIcon
            icon={faCampground}
            size={iconSize}
            className="icon"
          />

          <p>Camping</p>
        </div>
        <div className="lower-navbar-carousel-item">
          <CastleIcon
            className="icon"
            sx={{
              "&:hover:": {
                color: "#67c7b9",
              },
            }}
          />
          <p>Castles</p>
        </div>
        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("Countryside")}
        >
          <FontAwesomeIcon icon={faWheatAwn} size={iconSize} className="icon" />

          <p> Countryside</p>
        </div>
        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("Arctic")}
        >
          <FontAwesomeIcon
            icon={faSnowflake}
            size={iconSize}
            className="icon"
          />

          <p>Arctic</p>
        </div>
        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("Lakefront")}
        >
          <WavesIcon
            className="icon"
            sx={{
              "&:hover:": {
                color: "#67c7b9",
              },
            }}
          />
          <p>Lakefront</p>
        </div>
        <div className="lower-navbar-carousel-item">
          <FontAwesomeIcon icon={faCity} size={iconSize} className="icon" />

          <p>Iconic Cities</p>
        </div>
        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("Caves")}
        >
          <FontAwesomeIcon icon={faFire} size={iconSize} className="icon" />

          <p>Caves</p>
        </div>
        <div className="lower-navbar-carousel-item">
          <HouseIcon
            className="icon"
            sx={{
              "&:hover:": {
                color: "#67c7b9",
              },
            }}
          />
          <p>Barns</p>
        </div>
        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("Barns")}
        >
          <FontAwesomeIcon
            icon={faWaterLadder}
            size={iconSize}
            className="icon"
          />

          <p>Amazing Pool</p>
        </div>

        <div
          className="lower-navbar-carousel-item"
          onClick={() => setSelectedCategory("Luxury")}
        >
          <FontAwesomeIcon icon={faGem} size={iconSize} className="icon" />

          <p>Luxury</p>
        </div>
        <div className="lower-navbar-carousel-item">
          <BreakfastDiningIcon
            className="icon"
            sx={{
              "&:hover:": {
                color: "#67c7b9",
              },
            }}
          />
          <p>Bed & Breakfast</p>
        </div>
        <div className="lower-navbar-carousel-item">
          <FontAwesomeIcon icon={faSailboat} size={iconSize} className="icon" />

          <p>Islands</p>
        </div>
      </Carousel>
    </div>
  );
};

export default LowerNavbar;
