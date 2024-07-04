import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Loader from "../components/Loader";
import { API_23 } from "../api/api";
import "../styles/Bookings.scss";
import ReservationList from "../components/ReservationList";
import BookingsList from "../components/BookingsList";

const BookingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [userData, setUserData] = useState([]);

  const user = useSelector((state) => state.user);
  const host = useSelector((state) => state.host);

  const getBookingsData = async () => {
    try {
      setLoading(true);
      const resp = await axios.post(API_23, {
        id: user ? user._id : host._id,
        type: user ? "user" : "host",
      });
      setLoading(false);
      setBookingData(resp.data.booking);
      setUserData(resp.data.userData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookingsData();
  }, []);

  console.log(
    "Bookings Data",
    bookingData,
    "UsersData",
    userData,
    bookingData.length
  );

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 className="title-list">
        {user ? "Your Reservation List" : "Upcoming Bookings"}
      </h1>
      <div className="list">
        {bookingData.length === 0 ? (
          <h1 style={{ color: "red", display: "block" }}>
            {user ? "NO RESERVATIONS YET!" : "NO UPCOMING BOOKINGS"}
          </h1>
        ) : user ? (
          <ReservationList bookingData={bookingData} />
        ) : (
          <BookingsList bookingData={bookingData} userData={userData} />
        )}
      </div>
    </>
  );
};

export default BookingsPage;
