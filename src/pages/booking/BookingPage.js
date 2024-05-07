import React from "react";
import "../../styles/BookingPage.scss";
import { Link } from "react-router-dom";
import { API_3 } from "../../api/api";
const BookingPage = () => {
  return (
    <div className="main-container">
      <div className="title">
        <p>Booking Page</p>
      </div>
      <div className="content">
        <div className="booking-details">
          <div className="container-1">
            <div className="text">
              <div className="title">
                <p>Title of the Stay</p>
              </div>
              <div className="address">Saket, Delhi, New Delhi</div>
            </div>
            <div className="img">
              <img
                src={`${API_3}property/2bmiyu1gkolt9x7386Attours15.webp`}
                alt=""
              />
            </div>
          </div>
          <div className="container-2">
            <div className="box-1">
              <p>Check In</p>
              <p>01:00 pm</p>
            </div>
            <div className="box-2">
              <p>2 Nights</p>
            </div>
            <div className="box-3">
              <p>Check Out</p>
              <p>11:00 am</p>
            </div>
          </div>
          <div className="container-3">
            <div className="box">
              <p>Total Rooms</p>
              <p>3</p>
            </div>
            <div className="box">
              <p>Max Adults</p>
              <p>3</p>
            </div>
            <div className="box">
              <p>Max Child</p>
              <p>3</p>
            </div>
          </div>
        </div>
        <div className="payment-details">
          <div className="box">
            <p>1 Room * 3 Days</p>
            <p>Total: Rs 1000</p>
          </div>
          <div className="checkout-btn">
            <Link to="/BookingForm">
              <button>Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
