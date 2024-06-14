import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import ImageZoomPopup from "./ImageZoomPopup";
import "./PropertyCollage.css";

const PropertyCollage = ({
  pathArray,
  imageArr,
  imageIndex,
  zoomHandler,
  setShowCollage,
}) => {
  const [footerIsVisible, setFooterIsVisible] = useState(false);

  const imagePopup = useSelector((state) => state.imagePopup);

  const images = pathArray?.map((src, index) => {
    return <img onClick={() => zoomHandler(index)} key={index} src={src} />;
  });

  // Scroll Restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    observer.observe(footer);

    return () => {
      observer.unobserve(footer);
    };
  }, []);

  return (
    <Fragment>
      <ImageZoomPopup
        imageArr={imageArr}
        imageIndex={imageIndex}
        closeButton={true}
      />

      <div className="collage-container">
        {!footerIsVisible && !imagePopup && (
          <button
            className="collage-close-button"
            onClick={() => setShowCollage(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
        <div className="collage">{images}</div>
      </div>
    </Fragment>
  );
};

export default PropertyCollage;
