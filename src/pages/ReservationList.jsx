import { useEffect, useState } from "react";
import "../styles/ReservationList.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import axios from "axios";
import { API_23, API_3 } from "../api/api";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const reservationList = useSelector((state) => state.user.reservationList);
  const [bookings, setBookings] = useState();
  const listings = useSelector((state) => state.listings);
  const [bookingData, setBookingData] = useState([]);

  const handleBookingData = ({ booking, listing }) => {
    if (bookingData.includes({ booking, listing })) {
    } else {
    }
  };
  useEffect(() => {
    if (bookings && bookings.length > 0 && listings && listings.length > 0) {
      for (const elm of bookings) {
        // console.log("inside first for loop");
        for (const data of listings) {
          // console.log("inside second for loop");
          if (elm.listingId === data.hotelId) {
            console.log("Inside if block ", elm._id, " ", data.hotelId);
            if (!bookingData.some((item) => item.booking._id === elm._id)) {
              console.log("inside if block on true : ", elm._id);
              // setBookingData([...bookingData, { booking: elm, listing: data }]);
              setBookingData((prev) => [
                ...prev,
                { booking: elm, listing: data },
              ]);
            }
          }
        }
      }
    } else {
      console.log("Either bookings or listings is empty or undefined.");
    }
  }, [bookings, listings, reservationList]);

  // useEffect(() => {
  //   console.log("tempData : ", tempData);
  //   console.log("booking data :", bookings);
  // }, [tempData]);

  // const dispatch = useDispatch();
  // const getReservationList1 = async () => {
  //   try {
  //     const response = await axios.post(`${API_3}`, {
  //       id: userId,
  //     });
  //     console.log("response", response);
  //   } catch (error) {}
  // };

  // const getReservationList = async () => {
  //   console.log("userid", userId);
  //   try {
  //     const response = await fetch(`${API_3}users/${userId}/reservations`, {
  //       method: "GET",
  //     });

  //     const data = await response.json();
  //     console.log("response", data);
  //     dispatch(setReservationList(data));
  //     setLoading(false);
  //   } catch (err) {
  //     console.log("Fetch Reservation List failed!", err.message);
  //   }
  // };

  const getReservationListData = async () => {
    try {
      console.log("user", user);
      const resp = await axios.post(API_23, { email: user.email });
      // console.log(resp.data);
      setBookings(resp.data.booking);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getReservationList();
    getReservationListData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* <Navbar /> */}
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {/* {reservationList.length === 0 ? (
          <h1 style={{ color: "red" }}>NO RESERVATIONS YET!</h1>
        ) : (
          reservationList.map(
            ({
              listingId,
              hostId,
              startDate,
              endDate,
              totalPrice,
              booking = true,
            }) => (
              <ListingCard
                listingId={listingId._id}
                creator={hostId._id}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={booking}
              />
            )
          )
        )} */}
        {bookingData.length === 0 ? (
          <h1 style={{ color: "red" }}>NO RESERVATIONS YET!</h1>
        ) : (
          bookingData.map((ele) => (
            <div className="booking-data-container">
              <div className="booking-data">
                <div className="item">Booking No : {ele.booking._id}</div>
                <div className="booking-date">
                  Booked At : {ele.booking.createdAt.slice(0, 10)}
                </div>
                <div className="hotel-id">
                  Hotel Id : {ele.booking.listingId}
                </div>
                <div className="check-in">
                  Check In Date : {ele.booking.startDate}
                </div>
                <div className="check-out">
                  Check Out Date : {ele.booking.endDate}
                </div>

                <div className="total-price">
                  Total Price : {ele.booking.totalPrice}
                </div>
                <div className="place-type">
                  Type :{" "}
                  {ele.booking.placeType !== "An entire place"
                    ? `${ele.booking.roomType} Room`
                    : "An entire place"}
                </div>
                <div
                  className="room-count"
                  style={{
                    display: ele.booking.placeType === "Rooms" ? "" : "none",
                  }}
                >
                  Room Count : {ele.booking.roomCount}
                </div>
              </div>
              <div className="image-container">
                <img
                  src={`${API_3}${ele.listing.listingPhotoPaths[0].replace(
                    "public",
                    ""
                  )}`}
                  alt=""
                  srcset=""
                />
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default ReservationList;
