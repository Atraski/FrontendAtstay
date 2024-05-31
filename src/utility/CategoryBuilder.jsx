import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedCategory } from "../redux/state";
import "../styles/lowerNavbar.css";

const CategoryBuilder = ({ name, icon }) => {
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const dispatch = useDispatch();

  const iconSize = "2x";

  const selectedCategoryHandler = () => {
    dispatch(setSelectedCategory(name));
  };

  console.log(icon);

  return (
    <div
      className={`lower-navbar-carousel-item ${
        selectedCategory === name ? "active" : ""
      }`}
      onClick={selectedCategoryHandler}
    >
      {/* MUI icons are React components */}
      {React.isValidElement(icon) ? ( //Checks if the icons is a React element or not.
        React.cloneElement(icon, {
          className: "icon",
          style: { "&:hover": { color: "#67c7b9" } },
        })
      ) : (
        <FontAwesomeIcon icon={icon} size={iconSize} className="icon" />
      )}
      <p>{name}</p>
    </div>
  );
};

export default CategoryBuilder;
