import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState, useRef, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { setHostLogout, setLogout } from "../redux/state";
import UpperNavbar from "./UpperNavbar";
import LowerNavbar from "./LowerNavbar";
import { API_3 } from "../api/api";

const Navbar = ({ dropdownMenu, setDropdownMenu }) => {
  // const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guest, setGuest] = useState(1);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isResetPage, setIsResetPage] = useState(false);

  const user = useSelector((state) => state.user);
  const host = useSelector((state) => state.host);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  // For removing search bar when in Reset Password page
  useEffect(() => {
    if (location.pathname.split("/")[1] === "reset") {
      setIsResetPage(true);
    }
  }, [location]);

  return (
    <>
      <UpperNavbar />

      <Fragment>
        <div
          className="search-popup"
          style={{ display: showPopUp ? "flex" : "none" }}
        >
          <div className="container-1">
            <div className="close-btn" onClick={() => setShowPopUp(false)}>
              X
            </div>
            <div className="main-content">
              <div className="destination">
                <div className="input">
                  <input
                    type="text"
                    placeholder="Destination..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="search-btn">
                  <button
                    style={{ height: "2rem", padding: "1px 5px" }}
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
                      setShowPopUp(false);
                    }}
                  >
                    search
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
              <div className="check-out" style={{ background: "black" }}>
                <div className="label">CheckOutsasas</div>
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
              <div style={{ flexGrow: "1", justifyContent: "center" }} id="pc">
                <form
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
                  <input
                    type="text"
                    placeholder="Destination..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div>
                    <div>CheckIn</div>
                    <div>
                      <input
                        type="date"
                        placeholder="Checkin"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div>Checkout</div>
                    <div>
                      <input
                        type="date"
                        placeholder="Checkin"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="guest-container">
                    <div className="label">Guests</div>
                    <div className="guest-value-container">
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
                  <IconButton disabled={search === ""}>
                    <Search
                      sx={{ color: "#66cccc" }}
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
                    />
                  </IconButton>
                </form>
              </div>
            )}
            {!isResetPage && (
              <div className="showOnMob" id="mob">
                <div className="input" onClick={() => setShowPopUp(true)}>
                  <div className="text">Anywhere</div>
                  <div className="icon">
                    <IconButton disabled={search === ""}>
                      <Search sx={{ color: "#66cccc" }} />
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
                  {/* <Link to={`/${user._id}/trips`}>Trip List</Link> */}
                  <Link to={`/${user._id}/wishList`}>Wish List</Link>
                  {/* <Link to={`/${user._id}/properties`}>Property List</Link> */}
                  <Link to={`/${user._id}/reservations`}>Reservation List</Link>
                  {/* <Link to="/create-listing">Become A Host</Link> */}

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

      {/* <LowerNavbar /> */}
    </>
  );
};

export default Navbar;
