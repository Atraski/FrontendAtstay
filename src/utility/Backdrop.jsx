import ReactDOM from "react-dom";

import "./Backdrop.css";

const Backdrop = ({ show, backdropClose }) => {
  const port = document.querySelector("#overlay");

  return (
    show &&
    ReactDOM.createPortal(
      <div className="backdrop" onClick={backdropClose}></div>,
      port
    )
  );
};

export default Backdrop;
