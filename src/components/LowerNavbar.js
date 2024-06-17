import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

import CategoryBuilder from "../utility/CategoryBuilder";

const LowerNavbar = () => {
  const [isGrabbed, setIsGrabbed] = useState(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 10,
    },
    smallDesktop: {
      breakpoint: { max: 1420, min: 1117 },
      items: 8,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 4,
      partialVisibilityGutter: 12,
    },
  };

  const carouselMouseLeaveHandler = () => {
    setIsGrabbed(false);
  };

  const carouselMouseDownHandler = () => {
    setIsGrabbed(true);
  };

  const carouselMouseUpHandler = () => {
    setIsGrabbed(false);
  };

  const transition = "all 500ms ease-in-out";

  const categories = [
    { name: "All", icon: faGlobe },
    { name: "Beachfront", icon: faUmbrellaBeach },
    { name: "Desert", icon: faSun },
    { name: "Farms", icon: faTractor },
    { name: "Ski-in/out", icon: faPersonSkiing },
    { name: "Camping", icon: faCampground },
    { name: "Castles", icon: <CastleIcon /> },
    { name: "Countryside", icon: faWheatAwn },
    { name: "Arctic", icon: faSnowflake },
    { name: "Lakefront", icon: <WavesIcon /> },
    { name: "Iconic Cities", icon: faCity },
    { name: "Caves", icon: faFire },
    { name: "Barns", icon: <HouseIcon /> },
    { name: "Amazing Pool", icon: faWaterLadder },
    { name: "Luxury", icon: faGem },
    { name: "Bed & Breakfast", icon: <BreakfastDiningIcon /> },
    { name: "Islands", icon: faSailboat },
  ];

  return (
    <div
      onMouseLeave={carouselMouseLeaveHandler}
      onMouseDown={carouselMouseDownHandler}
      onMouseUp={carouselMouseUpHandler}
      className="nav-carousel-wrapper"
    >
      <Carousel
        responsive={responsive}
        containerClass="carousel"
        sliderClass={`slider ${isGrabbed ? "grabbing" : ""}`}
        customTransition={transition}
        removeArrowOnDeviceType={["mobile"]}
        partialVisible={true}
        swipeable={true}
        draggable={true}
        renderArrowsWhenDisabled={true}
        className="nav-carousel"
      >
        {categories.map((category, index) => (
          <CategoryBuilder
            key={index}
            name={category.name}
            icon={category.icon}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default LowerNavbar;
