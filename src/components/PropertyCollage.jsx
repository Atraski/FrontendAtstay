import { Fragment, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const images = pathArray?.map((src, index) => {
    return <img onClick={() => zoomHandler(index)} key={index} src={src} />;
  });

  // Scroll Restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <ImageZoomPopup
        imageArr={imageArr}
        imageIndex={imageIndex}
        closeButton={true}
      />

      <div className="collage-container">
        <button
          className="collage-close-button"
          onClick={() => setShowCollage(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="collage">{images}</div>
      </div>
    </Fragment>
  );
};

export default PropertyCollage;
