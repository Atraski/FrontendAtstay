import React from "react";
import { useSwipeable } from "react-swipeable";
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
  const btnpressprev = () => {
    // const box = document.getElementById('box'); // Get the element by its id
    let box = document.querySelector(".product-container");

    if (box) {
      const width = box.clientWidth;
      box.scrollLeft -= width; // Use -= to scroll to the left
      console.log(width);
    } else {
      console.error('Element with id "box" not found.');
    }
  };

  const btnpressnext = () => {
    // const box = document.getElementById('box'); // Get the element by its id
    let box = document.querySelector(".product-container");

    if (box) {
      const width = box.clientWidth;
      box.scrollLeft += width; // Use += to scroll to the right
      console.log(width);
    } else {
      console.error('Element with id "box" not found.');
    }
  };

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction}`);
    if (direction === "left") {
      btnpressnext();
    } else if (direction === "right") {
      btnpressprev();
    }
  };

  // Use the useSwipeable hook to add swipe functionality
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });
  return (
    <div className="product-carousel-1">
      <div
        className="pre-btn-1"
        onClick={(e) => {
          btnpressprev();
          e.stopPropagation();
        }}
      >
        <p>
          <img
            src={less}
            style={{ width: "22px", transform: "rotate(0deg)" }}
          />
        </p>
      </div>

      <div
        className="product-container"
        {...handlers}
        id="carousel-prod-container"
      >
        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={world}
              alt="First slide"
              onClick={() => setSelectedCategory("All")}
            />
          </div>
          <div className="text-container">
            <p>All</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={beach}
              alt="First slide"
              onClick={() => setSelectedCategory("Beachfront")}
            />
          </div>
          <div className="text-container">
            <p>Beachfront</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={desert}
              alt="First slide"
              onClick={() => setSelectedCategory("Desert")}
            />
          </div>
          <div className="text-container">
            <p>Desert</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={lake}
              alt="First slide"
              // onClick={() => handleProductClick2(3)}
            />
          </div>
          <div className="text-container">
            <p>Farms</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={trending}
              alt="First slide"
              onClick={() => setSelectedCategory("Ski-in/out")}
            />
          </div>
          <div className="text-container">
            <p>Ski-in/out</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={camping}
              alt="First slide"
              onClick={() => setSelectedCategory("Camping")}
            />
          </div>
          <div className="text-container">
            <p>Camping</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={mansion}
              alt="First slide"
              // onClick={() => handleProductClick5(6)}
            />
          </div>
          <div className="text-container">
            <p>Castles</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={Mountains}
              alt="First slide"
              onClick={() => setSelectedCategory("Countryside")}
            />
          </div>
          <div className="text-container">
            <p> Countryside</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={rooms}
              alt="First slide"
              onClick={() => setSelectedCategory("Arctic")}
            />
          </div>
          <div className="text-container">
            <p>Arctic</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={Beach}
              alt="First slide"
              onClick={() => setSelectedCategory("Lakefront")}
            />
          </div>
          <div className="text-container">
            <p>Lakefront</p>
          </div>
        </div>
        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={CityView}
              alt="First slide"
              // onClick={() => handleProductClick7(8)}
            />
          </div>
          <div className="text-container">
            <p>Iconic Cities</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={Heritage}
              alt="First slide"
              onClick={() => setSelectedCategory("Caves")}
            />
          </div>
          <div className="text-container">
            <p>Caves</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={TreeHouse}
              alt="First slide"
              onClick={() => setSelectedCategory("Barns")}
            />
          </div>
          <div className="text-container">
            <p>Barns</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={SunView}
              alt="First slide"
              // onClick={() => handleProductClick7(8)}
            />
          </div>
          <div className="text-container">
            <p>Amazing Pool</p>
          </div>
        </div>

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={Luxe}
              alt="First slide"
              onClick={() => setSelectedCategory("Luxury")}
            />
          </div>
          <div className="text-container">
            <p>Luxury</p>
          </div>
        </div>

        {/* <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={BedBreakFast}
              alt="First slide"
              // onClick={() => handleProductClick7(8)}
            />
          </div>
          <div className="text-container">
            <p>Bed & Breakfast</p>
          </div>
        </div> */}

        <div className="carousel-1">
          <div className="img-container">
            <img
              className="d-block-1 mycard-1"
              src={Tropical}
              alt="First slide"
              // onClick={() => handleProductClick7(8)}
            />
          </div>
          <div className="text-container">
            <p>Islands</p>
          </div>
        </div>
      </div>
      <div
        className="next-btn-1"
        onClick={(e) => {
          btnpressnext();
          e.stopPropagation();
        }}
      >
        <p>
          <img src={less} style={{ width: "22px", transform: "scaleX(-1)" }} />
        </p>
      </div>
    </div>
  );
};

export default LowerNavbar;
