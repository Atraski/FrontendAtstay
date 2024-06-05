import { Fragment, useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Footer from "../components/Footer";
import ImageZoomPopup from "../components/ImageZoomPopup";
import { API_10, API_11, API_3, API_9 } from "../api/api";
import { setBookingData, setImagePopup, setTempHostData } from "../redux/state";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [selectRoom, setSelectedRoom] = useState();
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [datesArray, setDatesArray] = useState([]);
  const [availability, setAvailability] = useState("");
  const [roomCount, setRoomCount] = useState(1);
  const [guestCounter, setGuestCounter] = useState(1);
  const [roomCountErr, setRoomCountErr] = useState();
  const [dayCountErr, setDayCountErr] = useState();
  const [image, setImage] = useState();
  const [imageArr, setImageArr] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (listing) {
      setImageArr(listing.listingPhotoPaths);
    }
  }, [listing]);

  const { listingId } = useParams();
  const getHostInfo = async () => {
    try {
      const resp = await axios.post(API_11, { id: listing.hostId });
      dispatch(setTempHostData({ tempHost: resp.data }));
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHostInfo();
    setSelectedRoom(
      listing &&
        listing.rooms.length !== 0 &&
        (listing.rooms[0].price === 0
          ? listing.rooms[1].price === 0
            ? listing.rooms[2].roomType
            : listing.rooms[1].roomType
          : listing.rooms[0].roomType)
    );
  }, [listing]);

  const getListingDetails = async () => {
    try {
      const response = await fetch(`${API_9}${listingId}`, {
        method: "GET",
      });

      const data = await response.json();
      // console.log(data[0]);
      setListing(data[0]);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };
  // console.log("listing details ", listing);

  useEffect(() => {
    getListingDetails();
  }, []);

  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id);
  const tempHost = useSelector((state) => state?.tempHost);
  const host = useSelector((state) => state?.host);

  console.log(host);

  const navigate = useNavigate();

  const currentDate = new Date();

  useEffect(() => {
    if (roomCount < 1) {
      setRoomCountErr("Room Count must be greater than 0");
    } else {
      setRoomCountErr(null);
      // setAvailability(null);
    }
    // if (dayCount < 1) {
    //   setDayCountErr("Please Select proper date range");
    // } else {
    //   setDayCountErr(null);
    //   setAvailability("null");
    // }
    if (currentDate < start) {
      if (roomCount > 0 && dayCount > 0) {
        checkAvailability();
        setDayCountErr(null);
      }
      // console.log("start :",start," \n currentDate : ",currentDate)
    }
  }, [roomCount, dayCount, datesArray, selectRoom]);

  const checkAvailability = async () => {
    try {
      console.log("roomCount in api", roomCount);
      const resp = await axios.post(API_10, {
        date: datesArray,
        hotelId: listing.hotelId,
        roomType: selectRoom,
        roomNum: roomCount,
        type: listing.type,
      });
      console.log("Response ", resp.data);
      if (listing.type === "Rooms") {
        if (resp.data.roomAvailability) {
          setAvailability("Available");
        } else {
          setAvailability("Not Available");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    // console.log("startDate", startDateObj);
    // console.log("endDate", endDateObj);
    const dates = [];
    let currentDate = startDateObj;

    // Loop through each date until the day before the end date
    while (currentDate < endDateObj) {
      const formattedDate = currentDate.toISOString().split("T")[0];

      dates.push(formattedDate);

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDatesArray(dates);
  }, [startDate, endDate]);
  useEffect(() => {
    console.log("Dates Array", datesArray);
  }, [datesArray]);

  useEffect(() => {
    const startdate = new Date(dateRange[0].startDate);
    const startyear = startdate.getFullYear();
    const startmonth = String(startdate.getMonth() + 1).padStart(2, "0");
    const startday = String(startdate.getDate()).padStart(2, "0");
    const startformattedDate = `${startyear}-${startmonth}-${startday}`;
    setStartDate(startformattedDate);
    const enddate = new Date(dateRange[0].endDate);
    const endyear = enddate.getFullYear();
    const endmonth = String(enddate.getMonth() + 1).padStart(2, "0");
    const endday = String(enddate.getDate()).padStart(2, "0");
    const endformattedDate = `${endyear}-${endmonth}-${endday}`;
    setEndDate(endformattedDate);
  }, [dateRange]);

  const handleSubmit = async () => {
    try {
      if (dayCount > 0 && roomCount > 0) {
        const bookingForm = {
          customerId,
          listingId,
          hostId: listing.hostId,
          startDate: dateRange[0].startDate.toDateString(),
          endDate: dateRange[0].endDate.toDateString(),
          totalPrice: listing.price * dayCount,
          type: listing.type,
          roomType: selectRoom,
          roomCount,
          totalRoomPrice: price * dayCount,
          dayCount: dayCount,
          perRoomPrice: price,
          img: listing.listingPhotoPaths[0],
          listing: listing,
          dates: { startDate, endDate },
          datesArray: datesArray,
          guestCount: guestCounter,
        };
        console.log("dayCount", dayCount);
        console.log("handleSubmit button clicked", bookingForm);
        dispatch(
          setBookingData({
            bookingData: bookingForm,
          })
        );

        // const response = await fetch("http://localhost:3001/bookings/create", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(bookingForm),
        // });

        // if (response.ok) {
        //   navigate(`/${customerId}/trips`);
        // }
        // navigate("/bookingPage");
        navigate("/cartDetailspage");
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  useEffect(() => {
    dispatch(setImagePopup({ show: false }));
    console.log("use Effect is running");
  }, []);

  const handleZoom = (index) => {
    dispatch(setImagePopup({ show: true }));
    if (listing.listingPhotoPaths) {
      setImageArr(listing.listingPhotoPaths);
    }
    setImageIndex(index);
  };

  useEffect(() => {
    // console.log("listing", listing.rooms[0].price);
    if (listing) {
      if (listing.type === "Rooms") {
        if (selectRoom === "standard") {
          setPrice(listing.rooms[0].price);
          // console.log("listing", listing.rooms[0].price);
        } else if (selectRoom === "double") {
          setPrice(listing.rooms[1].price);
          // console.log("listing", listing.rooms[1].price);
        } else if (selectRoom === "deluxe") {
          setPrice(listing.rooms[2].price);
          // console.log("listing", listing.rooms[2].price);
        }
      } else if (listing.type === "An entire place") {
        setPrice(listing.price);
      }
    }
  }, [selectRoom, listing]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ImageZoomPopup imageArr={imageArr} imageIndex={imageIndex} />
      <div className="listing-details">
        <div className="title">
          <h1>{listing && listing.title}</h1>
        </div>

        <div className=" imageset d-flex" id="pc">
          <div className="outerimage">
            <img
              src={`${API_3}${listing.listingPhotoPaths[0].replace(
                "public",
                ""
              )}`}
              onClick={() => handleZoom(0)}
            />
          </div>
          <div className="innerimage">
            <img
              src={`${API_3}${listing.listingPhotoPaths[1].replace(
                "public",
                ""
              )}`}
              onClick={() => handleZoom(1)}
            />
            <img
              src={`${API_3}${listing.listingPhotoPaths[2].replace(
                "public",
                ""
              )}`}
              onClick={() => handleZoom(2)}
            />
          </div>

          <div className="innerimage2">
            <img
              src={`${API_3}${listing.listingPhotoPaths[3].replace(
                "public",
                ""
              )}`}
              onClick={() => handleZoom(3)}
            />
            <img
              src={`${API_3}${listing.listingPhotoPaths[4].replace(
                "public",
                ""
              )}`}
              onClick={() => handleZoom(4)}
            />
          </div>
        </div>

        <div className="mob-img-container" id="mob">
          <div className="main-img">
            <img
              src={
                image ||
                `${API_3}${listing.listingPhotoPaths[0].replace("public", "")}`
              }
              alt=""
              srcset=""
              onClick={() => handleZoom(0)}
            />
          </div>
          <div className="short-img-container">
            {listing.listingPhotoPaths?.map((item, id) => (
              <div
                className="img"
                key={id}
                onClick={() =>
                  setImage(`${API_3}${item.replace("public", "")}`)
                }
              >
                <img
                  src={`${API_3}${item.replace("public", "")}`}
                  alt=""
                  srcset=""
                  onClick={() => handleZoom(id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="details">
          <div
            className="property-details"
            style={
              host
                ? {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                  }
                : {}
            }
          >
            <h2
              style={
                host ? { borderBottom: "1px solid gray", width: "100%" } : {}
              }
            >
              {listing.type} in {listing.city}, {listing.province},{" "}
              {listing.country}
            </h2>

            <p style={{ display: listing.type === "Rooms" ? "none" : "" }}>
              {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
              {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
            </p>
            <hr />

            <div className="profile">
              <h3 style={host ? { borderBottom: "1px solid gray" } : {}}>
                Hosted by {tempHost ? tempHost.firstName : "firstname"}{" "}
                {tempHost ? tempHost.lastName : "lastNAme"}
              </h3>
            </div>
            <hr />

            <h3 style={host ? { borderBottom: "1px solid gray" } : {}}>
              Description
            </h3>
            <p>{listing.description}</p>
            <hr />

            <h3 style={host ? { borderBottom: "1px solid gray" } : {}}>
              {listing.highlight}
            </h3>
            <p>{listing.highlightDesc}</p>
            <hr />

            <div className="booking">
              <div>
                <h2>What this place offers?</h2>
                <div className="amenities">
                  {listing.amenities[0].split(",").map((item, index) => (
                    <div className="facility" key={index}>
                      <div className="facility_icon">
                        {
                          facilities.find((facility) => facility.name === item)
                            ?.icon
                        }
                      </div>
                      <p id="booking-box">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {!host && (
            <div className="date-box-container">
              <h2>How long do you want to stay?</h2>
              <div className="date-range-calendar">
                <DateRange
                  ranges={dateRange}
                  minDate={new Date()}
                  onChange={handleSelect}
                />
                {dayCount > 1 ? (
                  <h2>
                    Rs. {price} x {dayCount} nights
                  </h2>
                ) : (
                  <h2>
                    Rs. {price} x {dayCount} night
                  </h2>
                )}

                <div className="error-container">
                  {dayCountErr && <p style={{ color: "red" }}>{dayCountErr}</p>}
                </div>
                <div
                  className="div room-type"
                  style={{ display: listing.type === "Rooms" ? "" : "none" }}
                >
                  {listing.rooms.length !== 0 && (
                    <Fragment>
                      <div className="rooms-type">
                        <button
                          onClick={() => setSelectedRoom("standard")}
                          style={{
                            background:
                              selectRoom === "standard" ? "#66cccc" : "white",
                            color:
                              selectRoom === "standard" ? "white" : "#66cccc",
                            display: listing.rooms[0].price !== 0 ? "" : "none",
                          }}
                        >
                          Standard
                        </button>
                        <button
                          onClick={() => setSelectedRoom("double")}
                          style={{
                            background:
                              selectRoom === "double" ? "#66cccc" : "white",
                            color:
                              selectRoom === "double" ? "white" : "#66cccc",
                            display: listing.rooms[1].price !== 0 ? "" : "none",
                          }}
                        >
                          Double
                        </button>
                        <button
                          onClick={() => setSelectedRoom("deluxe")}
                          style={{
                            background:
                              selectRoom === "deluxe" ? "#66cccc" : "white",
                            color:
                              selectRoom === "deluxe" ? "white" : "#66cccc",
                            display: listing.rooms[2].price !== 0 ? "" : "none",
                          }}
                        >
                          Deluxe
                        </button>
                      </div>

                      <div className="rooms-count">
                        <div className="text">Rooms</div>
                        <div className="value">
                          <div
                            className="decrement"
                            onClick={() => {
                              if (parseInt(roomCount) > 1) {
                                console.log("inside if", roomCount);
                                setRoomCount(parseInt(roomCount) - 1);
                              }
                            }}
                          >
                            -
                          </div>

                          <div className="input">{roomCount}</div>
                          <div
                            className="increment"
                            onClick={() =>
                              setRoomCount(parseInt(roomCount) + 1)
                            }
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                  <div className="rooms-count">
                    <div className="text">Guests</div>
                    <div className="value">
                      <div
                        className="decrement"
                        onClick={() => {
                          if (parseInt(guestCounter) > 1) {
                            setGuestCounter(parseInt(guestCounter) - 1);
                          }
                        }}
                      >
                        -
                      </div>
                      <div className="input">{guestCounter}</div>
                      <div
                        className="increment"
                        onClick={() => {
                          if (parseInt(guestCounter) < listing.guestCount) {
                            setGuestCounter(parseInt(guestCounter) + 1);
                          }
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="error-container">
                    {roomCountErr && (
                      <p style={{ color: "red" }}>{roomCountErr}</p>
                    )}
                  </div>
                </div>

                <div className="availability-container">
                  {/* <div className="button" style={{ backgroundColor: "white" }}>
                  <button onClick={() => handleAvailability()}>
                    Check Availability
                  </button>
                </div> */}
                  <div
                    className="text"
                    style={{
                      color: availability === "Available" ? "#66cccc" : "red",
                    }}
                  >
                    {availability}
                  </div>
                </div>
                <h2>Total price: Rs. {price * dayCount * roomCount}</h2>
                <p>*All taxes are included</p>
                <p>CheckIn Date: {dateRange[0].startDate.toDateString()}</p>
                <p>CheckOut Date: {dateRange[0].endDate.toDateString()}</p>

                <button
                  className="button"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!(availability === "Available")}
                  style={{
                    background:
                      availability === "Available" ? "#F8395A" : "grey",
                  }}
                >
                  BOOKING
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="stickyBookNow">
          <p>Total price: Rs. {price * dayCount * roomCount}</p>
          <a href="#booking-box">
            <button className="mobileBookNow" onClick={() => {}}>
              Book Now
            </button>
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;
