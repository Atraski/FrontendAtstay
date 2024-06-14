import { useRef, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

  console.log("SHOWPUP2", showPopUp);

  return (
    <Fragment>
      <Backdrop backdropClose={() => setShowPopUp(false)} show={showPopUp} />
      <div
        className="search-popup"
        style={{ display: showPopUp ? "flex" : "none" }}
      >
        <div className="container-1">
          <button
            className="search-close-btn"
            onClick={() => setShowPopUp(false)}
          >
            <FontAwesomeIcon icon={faXmark} style={{ color: "white" }} />
          </button>
          <div className="main-content">
            <div className="destination">
              <div className="input">
                <input
                  type="text"
                  placeholder="Destination..."
                  value={search}
                  onChange={searchChangeHandler}
                />
                {filteredResults.length > 0 && (
                  <div ref={dropdownRef} className="dropdown-container">
                    {(() => {
                      const filteredCategories = getUniqueResults(
                        filteredResults.filter((filteredItem) =>
                          filteredItem.category
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ),
                        "category"
                      );
                      if (filteredCategories.length !== 0) {
                        return (
                          <div className="dropdown-section" key="category">
                            <h4>Category</h4>
                            {filteredCategories.map((filteredItem) => (
                              <Link
                                to={`/properties/search/${filteredItem.category}/undefined/undefined/${guest}`}
                                key={filteredItem._id}
                              >
                                <div>{filteredItem.category}</div>
                              </Link>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })()}
                    {(() => {
                      const filteredCities = getUniqueResults(
                        filteredResults.filter((filteredItem) =>
                          filteredItem.city
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ),
                        "city"
                      );
                      if (filteredCities.length !== 0) {
                        return (
                          <div className="dropdown-section" key="city">
                            <h4>City</h4>
                            {filteredCities.map((filteredItem) => (
                              <Link
                                to={`/properties/search/${filteredItem.city}/undefined/undefined/${guest}`}
                                key={filteredItem._id}
                              >
                                <div>{filteredItem.city}</div>
                              </Link>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })()}
                    {(() => {
                      const filteredTitles = getUniqueResults(
                        filteredResults.filter((filteredItem) =>
                          filteredItem.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ),
                        "title"
                      );
                      if (filteredTitles.length !== 0) {
                        return (
                          <div className="dropdown-section" key="title">
                            <h4>Title</h4>
                            {filteredTitles.map((filteredItem) => (
                              <Link
                                to={`/properties/search/${filteredItem.title}/undefined/undefined/${guest}`}
                                key={filteredItem._id}
                              >
                                <div>{filteredItem.title}</div>
                              </Link>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}
              </div>
              <div className="search-btn">
                <button
                  style={{ height: "2rem", padding: "1px 5px" }}
                  onClick={() => {
                    if (
                      search.trim().length > 0 &&
                      checkIn &&
                      checkOut &&
                      guest
                    ) {
                      navigate(
                        `/properties/search/${search.trim()}/${checkIn}/${checkOut}/${guest}`
                      );
                    } else if (
                      search.trim().length > 0 &&
                      (checkIn || checkOut)
                    ) {
                      window.alert("please alert proper date");
                    } else if (search.trim().length > 0) {
                      navigate(
                        `/properties/search/${search.trim()}/undefined/undefined/${guest}`
                      );
                    }
                    setShowPopUp(false);
                  }}
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
                  className="icons"
                  onClick={() => {
                    if (guest > 1) {
                      setGuest((prev) => prev - 1);
                    }
                  }}
                >
                  -
                </button>
                <p className="guest-value" style={{ margin: "auto 0" }}>
                  {guest}
                </p>
                <button
                  className="icons"
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
    </Fragment>
  );
};

export default MobileNavbar;
