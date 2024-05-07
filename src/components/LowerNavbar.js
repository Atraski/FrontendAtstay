import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import rooms from "../images/rooms.jpg";
import beach from "../images/beach.jpg";
import lake from "../images/lake.jpg";
import camping from "../images/camping.jpg";
import trending from "../images/trending.jpg";
import mansion from "../images/Mansion.jpg";
import tea from "../images/tea.jpg";
import less from "../images/less.png";
import Beach from "../images/Beach.png";
import CityView from "../images/CityView.png";
import Heritage from "../images/Heritage.png";
import TreeHouse from "../images/TreeHouse.png";
import SunView from "../images/SunView.png";
import NationalPark from "../images/NationalPark.png";
import BedBreakFast from "../images/Bed&Breakfast.png";
import world from "../images/world-1.png";
import desert from "../images/desert.jpg";
import Tropical from "../images/Tropical.png";
import Luxe from "../images/Luxe.png";
import Mountains from "../images/Mountains.png";
import "../styles/lowerNavbar.css";

const LowerNavbar = ({ setSelectedCategory }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive} containerClass="carousel">
      <div className="carousel-item" onClick={() => setSelectedCategory("All")}>
        <img src={world} alt="First slide" />
        <p>All</p>
      </div>
      <div
        className="carousel-item"
        onClick={() => setSelectedCategory("Beachfront")}
      >
        <img src={beach} alt="First slide" />
        <p>Beachfront</p>
      </div>
      <div
        className="carousel-item"
        onClick={() => setSelectedCategory("Desert")}
      >
        <img src={desert} alt="First slide" />
        <p>Desert</p>
      </div>
      <div
        className="carousel-item"
        onClick={() => setSelectedCategory("lake")}
      >
        <img src={lake} alt="First slide" />

        <p>Farms</p>
      </div>
      <div
        className="carousel-item"
        onClick={() => setSelectedCategory("Ski-in/out")}
      >
        <img src={trending} alt="First slide" />

        <p>Ski-in/out</p>
      </div>
      <div
        className="carousel-item"
        onClick={() => setSelectedCategory("Camping")}
      >
        <img src={camping} alt="First slide" />

        <p>Camping</p>
      </div>
      <div className="carousel-item">
        <img src={mansion} alt="First slide" />

        <p>Castles</p>
      </div>
      <div
        className="carousel-item"
        onClick={() => setSelectedCategory("Countryside")}
      >
        <img src={Mountains} alt="First slide" />

        <p> Countryside</p>
      </div>
      <div
        className="carousel-item"
        onClick={() => setSelectedCategory("Arctic")}
      >
        <img src={rooms} alt="First slide" />

        <p>Arctic</p>
      </div>
      <div
        className="carousel-item"
        onClick={() => setSelectedCategory("Lakefront")}
      >
        <img src={Beach} alt="First slide" />

        <p>Lakefront</p>
      </div>
      <div className="carousel-item">
        <img src={CityView} alt="First slide" />

        <p>Iconic Cities</p>
      </div>
      <div
        className="carousel-item"
        onClick={() => setSelectedCategory("Caves")}
      >
        <img src={Heritage} alt="First slide" />

        <p>Caves</p>
      </div>
      <div className="carousel-item">
        <img src={TreeHouse} alt="First slide" />

        <p>Barns</p>
      </div>
      <div
        className="carousel-item"
        onClick={() => setSelectedCategory("Barns")}
      >
        <img src={SunView} alt="First slide" />

        <p>Amazing Pool</p>
      </div>

      <div
        className="carousel-item"
        onClick={() => setSelectedCategory("Luxury")}
      >
        <img src={Luxe} alt="First slide" />

        <p>Luxury</p>
      </div>
      <div className="carousel-item">
        <img src={BedBreakFast} alt="First slide" />

        <p>Bed & Breakfast</p>
      </div>
      <div className="carousel-item">
        <img src={Tropical} alt="First slide" />

        <p>Islands</p>
      </div>
    </Carousel>
  );
};

export default LowerNavbar;
