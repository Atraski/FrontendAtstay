import { useState, useRef, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { setHostLogout, setLogout } from "../redux/state";
import variables from "../styles/variables.scss";
import UpperNavbar from "./UpperNavbar";
import { API_3, API_21 } from "../api/api";
import getUniqueResults from "../utility/getUniqueResults";
import "../styles/Navbar.scss";

const Navbar = ({ dropdownMenu, setDropdownMenu }) => {
  const [search, setSearch] = useState("");
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guest, setGuest] = useState(1);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isResetPage, setIsResetPage] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const user = useSelector((state) => state.user);
  const host = useSelector((state) => state.host);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef(null);

  const searchIsEmpty = search.trim().length === 0;

  useEffect(() => {
    if (location.pathname.split("/")[1] === "reset") {
      setIsResetPage(true);
    } else {
      setIsResetPage(false);
    }
  }, [location]);

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(async () => {
        if (e.target.value.length > 1) {
          const response = await fetch(`${API_21}${e.target.value}`);
          const resData = await response.json();
          setFilteredResults(resData);
        } else {
          setFilteredResults([]);
        }
      }, 500)
    );
  };

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

  console.log(filteredResults);

  return (
    <>
      <UpperNavbar />
      <Fragment>
        {/* Mobile Navbar */}
        <div
          className="search-popup"
          style={{ display: showPopUp ? "flex" : "none" }}
        >
          <div className="container-1">
            <div className="close-btn" onClick={() => setShowPopUp(false)}>
              <FontAwesomeIcon icon={faXmark} style={{ color: "white" }} />
            </div>
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

        <div className="navbar">
          <Link to="/">
            <img src="/assets/logo.webp" alt="logo" />
          </Link>
          <div
            className="search-container"
            style={
              !isResetPage
                ? { display: "flex", gap: "2rem", alignItems: "center" }
                : {
                    display: "flex",
                    justifyContent: "flex-end",
                  }
            }
          >
            {!isResetPage && (
              <div id="pc">
                <form
                  style={{
                    flexGrow: "1",
                    justifyContent: "center",
                  }}
                  className="navbar_search"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (search.length > 0 && checkIn && checkOut && guest) {
                      navigate(
                        `/properties/search/${search}/${checkIn}/${checkOut}/${guest}`
                      );
                    } else if (search.length > 0 && (checkIn || checkOut)) {
                      window.alert("please alert proper date");
                    } else if (search.length > 0) {
                      navigate(
                        `/properties/search/${search}/undefined/undefined/${guest}`
                      );
                    }
                  }}
                >
                  <div>
                    <div className="input-heading">Desired destination</div>
                    <input
                      type="text"
                      placeholder="Destination..."
                      value={search}
                      onChange={searchChangeHandler}
                      className="border"
                    />

                    {/* Dropdown */}
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

                  <div>
                    <div className="input-heading">CheckIn</div>
                    <div>
                      <input
                        type="date"
                        placeholder="Checkin"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="border"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="input-heading">Checkout</div>
                    <div>
                      <input
                        type="date"
                        placeholder="Checkin"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="border"
                      />
                    </div>
                  </div>
                  <div className="guest-container">
                    <div className="label input-heading">Guests</div>
                    <div className="guest-value-container border">
                      <p
                        className="icons"
                        onClick={() => {
                          if (guest > 1) {
                            setGuest((prev) => prev - 1);
                          }
                        }}
                      >
                        -
                      </p>
                      <p className="guest-value">{guest}</p>
                      <p
                        className="icons"
                        onClick={() => {
                          if (guest < 100) {
                            setGuest((prev) => prev + 1);
                          }
                        }}
                      >
                        +
                      </p>
                    </div>
                  </div>
                  <h3
                    className="search-btn"
                    disabled={searchIsEmpty}
                    onClick={() => {
                      if (search.length > 0 && checkIn && checkOut && guest) {
                        navigate(
                          `/properties/search/${search}/${checkIn}/${checkOut}/${guest}`
                        );
                      } else if (search.length > 0 && (checkIn || checkOut)) {
                        window.alert("please alert proper date");
                      } else if (search.length > 0) {
                        navigate(
                          `/properties/search/${search}/undefined/undefined/${guest}`
                        );
                      }
                    }}
                  >
                    Search
                  </h3>
                </form>
              </div>
            )}
            {!isResetPage && (
              <div className="showOnMob" id="mob">
                <div className="input" onClick={() => setShowPopUp(true)}>
                  <div className="text">Anywhere</div>
                  <div className="icon">
                    <IconButton
                      style={
                        searchIsEmpty
                          ? { background: "#d3d3d3", cursor: "not-allowed" }
                          : {}
                      }
                      disabled={searchIsEmpty}
                    >
                      <Search
                        sx={
                          searchIsEmpty
                            ? { color: "#808080" }
                            : { color: "#66cccc" }
                        }
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            )}
            <div className="navbar_right00">
              {host ? (
                <Link to="/create-listing" className="host mobHost">
                  Become A Host
                </Link>
              ) : (
                <Link to="/HostLogin" className="host mobHost">
                  Become A Host
                </Link>
              )}
              <button
                className="navbar_right_account"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownMenu(!dropdownMenu);
                }}
              >
                <Menu sx={{ color: variables.darkgrey }} />
                {!user ? (
                  <Person sx={{ color: variables.darkgrey }} />
                ) : (
                  <img
                    src={`${API_3}${user.profileImagePath.replace(
                      "public",
                      ""
                    )}`}
                    alt="profile photo"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                )}
              </button>
              {dropdownMenu && !user && !host && (
                <div className="navbar_right_accountmenu">
                  <Link to="/login">Log In</Link>
                  <Link to="/register">Sign Up</Link>
                  <Link to="/hostLogin">Host Login</Link>
                </div>
              )}
              {dropdownMenu && user && (
                <div className="navbar_right_accountmenu">
                  <Link to={`/${user._id}/wishList`}>Wish List</Link>
                  <Link to={`/${user._id}/reservations`}>Reservation List</Link>
                  <Link
                    to="/login"
                    onClick={() => {
                      dispatch(setLogout());
                    }}
                  >
                    Log Out
                  </Link>
                </div>
              )}
              {dropdownMenu && host && (
                <div className="navbar_right_accountmenu">
                  <Link to="/create-listing">Add Property</Link>
                  <Link to={`/${host._id}/properties`}>Property List</Link>
                  <Link to="/create-availability">Create Availability</Link>
                  <Link
                    to="/"
                    onClick={() => {
                      dispatch(setHostLogout());
                    }}
                  >
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default Navbar;
