import { useRef, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "../../styles/Navbar.scss";
import Backdrop from "../../utility/Backdrop";

const MobileNavbar = ({
  showPopUp,
  setShowPopUp,
  search,
  searchChangeHandler,
  filteredResults,
  setFilteredResults,
  getUniqueResults,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guest,
  setGuest,
  showDropdown,
}) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e?.target)) {
      setFilteredResults([]);
    }
  };

  useEffect(() => {
    closeDropdown();
  }, [location]);

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const closeButtonHandler = () => {
    setShowPopUp(false);
  };

  const searchIsEmpty = search.trim().length === 0;

  console.log("SHOWPUP2", showPopUp);

  return (
    <Fragment>
      <Backdrop show={showPopUp} backdropClose={closeButtonHandler} />
      {showPopUp && (
        <div className="search-popup">
          <div className="container-1">
            <button className="search-close-btn" onClick={closeButtonHandler}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="main-content">
              <div className="destination">
                <input
                  type="text"
                  placeholder="Destination..."
                  value={search}
                  onChange={searchChangeHandler}
                />
                {showDropdown && (
                  <div ref={dropdownRef} className="dropdown-container">
                    {(() => {
                      // Combine all the filtered results into one array
                      const combinedResults = [
                        ...getUniqueResults(
                          filteredResults.filter((filteredItem) =>
                            filteredItem.category
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ),
                          "category"
                        ).map((item) => ({ ...item, type: "category" })),
                        ...getUniqueResults(
                          filteredResults.filter((filteredItem) =>
                            filteredItem.city
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ),
                          "city"
                        ).map((item) => ({ ...item, type: "city" })),
                        ...getUniqueResults(
                          filteredResults.filter((filteredItem) =>
                            filteredItem.title
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ),
                          "title"
                        ).map((item) => ({ ...item, type: "title" })),
                      ];

                      if (combinedResults.length !== 0) {
                        return (
                          <div className="dropdown-section" key="combined">
                            {combinedResults.map((filteredItem, index) => (
                              <Link
                                to={`/properties/search/${
                                  filteredItem[filteredItem.type]
                                }/undefined/undefined/${guest}`}
                                key={filteredItem._id}
                              >
                                <div>{filteredItem[filteredItem.type]}</div>
                              </Link>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}
                <div className="search-btn-container">
                  <button
                    className="search-btn"
                    onClick={() => {
                      if (!searchIsEmpty && checkIn && checkOut && guest) {
                        navigate(
                          `/properties/search/${search.trim()}/${checkIn}/${checkOut}/${guest}`
                        );
                      } else if (!searchIsEmpty && (checkIn || checkOut)) {
                        window.alert("please alert proper date");
                      } else if (!searchIsEmpty) {
                        navigate(
                          `/properties/search/${search.trim()}/undefined/undefined/${guest}`
                        );
                      }
                      setShowPopUp(false);
                    }}
                    disabled={searchIsEmpty}
                    style={
                      searchIsEmpty
                        ? {
                            backgroundColor: "rgb(214,214,214,0.65)",
                            color: "#a1a1a1",
                          }
                        : {}
                    }
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="check-in">
                <div className="label">CheckIn</div>
                <div>
                  <input
                    type="date"
                    placeholder="Checkin"
                    value={checkIn}
                    min={today}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
              </div>
              <div className="check-out">
                <div className="label">CheckOut</div>
                <div>
                  <input
                    type="date"
                    placeholder="Checkin"
                    value={checkOut}
                    min={today}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>
              <div className="guest">
                <div className="label">Guests</div>
                <div className="guest-value-container">
                  <button
                    className="guest-value-control"
                    onClick={() => {
                      if (guest > 1) {
                        setGuest((prev) => prev - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <p className="guest-value">{guest}</p>
                  <button
                    className="guest-value-control"
                    onClick={() => {
                      if (guest < 100) {
                        setGuest((prev) => prev + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MobileNavbar;
