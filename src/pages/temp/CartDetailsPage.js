import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoginPopup from "../../components/LoginPopup";
import Footer from "../../components/Footer";
import { setBookingData, setShowPopup } from "../../redux/state";
import { API_15, API_16, API_17, API_22, API_3 } from "../../api/api";
import "./CartDetailspage.css";
import Backdrop from "../../utility/Backdrop";
// import "../../styles/form.css";

export default function CartDetailsPage() {
  const bookingData = useSelector((state) => state.bookingData);
  const user = useSelector((state) => state?.user);
  const listing = useSelector((state) => state?.listings);
  const dispatch = useDispatch();
  const [formIsShown, setFormIsShown] = useState(false);

  const mm1 = bookingData;

  const adult = localStorage.getItem("adult");
  const child = localStorage.getItem("child");
  const room = localStorage.getItem("room");
  const checkinn = localStorage.getItem("checkin");
  const checkoutt = localStorage.getItem("checkout");
  const diff = localStorage.getItem("numberOfDays");

  const navigate = useNavigate();

  const amunt = room * diff;

  const amunt2 =
    amunt *
    (bookingData.type === "Rooms"
      ? bookingData.totalRoomPrice
      : bookingData.totalPrice);

  localStorage.setItem("amunt", amunt2);

  //Form Code

  const [clientName, setClientName] = useState(
    user?.firstName + " " + user?.lastName
  );
  const [email, setEmail] = useState(user?.email);
  const [phone, setphone] = useState(user?.contact);
  const [add, setadd] = useState("");
  const [street, setstreet] = useState("");
  const [pin, setpin] = useState("");
  const [country, setcountry] = useState("");
  const adult1 = parseInt(localStorage.getItem("adult")) || 0;
  const children = parseInt(localStorage.getItem("child")) || 0;
  const selectedDate = localStorage.getItem("selectedDate") || "";
  const amount =
    bookingData.perRoomPrice * bookingData.dayCount * bookingData.roomCount;
  const adds = localStorage.setItem("add", add) || "";
  const mails = localStorage.setItem("mail", email) || "";
  const phones = localStorage.setItem("phone", phone) || "";
  const namess = localStorage.setItem("namess", clientName);
  const tripname = localStorage.getItem("trip");
  const checkoutDate = localStorage.getItem("checkout");
  const checkin = localStorage.getItem("checkin");
  const rooms = localStorage.getItem("room");

  // useEffect(() => {
  //   const show = document.querySelector(".showsss");
  //   show.style.display = "none";
  // }, []);
  const showsss = () => {
    // if (user) {
    //   const show = document.querySelector(".showsss");
    //   show.style.display = "flex";
    //   show.style.overflow = "hidden";
    // } else {
    //   dispatch(setShowPopup({ popup: true }));
    // }
    if (user) {
      setFormIsShown(true);
    } else {
      dispatch(setShowPopup({ popup: true }));
    }
  };

  const closeee = (e) => {
    // e.preventDefault();
    // const show = document.querySelector(".showsss");
    // show.style.display = "none";
    setFormIsShown(false);
  };

  const checkout = async (amount) => {
    localStorage.setItem("amount", amount);

    // dispatch(
    //   setBookingData({
    //     bookingData: {
    //       ...bookingData,
    //       email,
    //       phone,
    //       add,
    //       pin,
    //       country,
    //       clientName,
    //     },
    //   })
    // );

    // Set the 'amount' in localStorage\
    try {
      if (phone.length === 10) {
        var data1 = await fetch(API_15, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });
        if (data1.success) {
          const responseData = await data1.json();
        }

        var keys = await fetch(API_16, {
          method: "GET",
        });
        keys = await keys.json();

        data1 = await data1.json();
      } else {
        alert("Please Enter Valid Number");
      }
      if (data1.success) {
        const options = {
          key: keys.key, // Enter the Key ID generated from the Dashboard
          amount: data1.order.tot, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Atstay", //your business name
          description: "Test Transaction",
          order_id: data1.order.id,
          callback_url: API_17,
          handler: function (response) {
            // Handle the payment success callback here

            try {
              saveDataToDatabase(response);
              navigate("/invoice");
            } catch (error) {
              console.error("Navigation error:", error);
            }
          },

          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new window.Razorpay(options);

        rzp1.on("payment.success", function (response) {});

        rzp1.open();
      } else {
        console.error("Error creating Razorpay order:", data1.error);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  let formData;
  const saveDataToDatabase = async (resp) => {
    try {
      if (bookingData.type === "Rooms") {
        formData = {
          email: email,
          hostId: bookingData.hostId,
          listingId: bookingData.listingId,
          roomType: bookingData.roomType,
          type: bookingData.type,
          roomCount: bookingData.roomCount,
          contact: phone,
          userId: user._id,
          adult,
          children,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          totalPrice:
            bookingData.dayCount *
            bookingData.perRoomPrice *
            bookingData.roomCount,
          status: "booked",
          paymentStatus: "success",
          guestCount: bookingData.guestCount,
          datesArray: bookingData.datesArray,
          razorpay_payment_id: resp.razorpay_payment_id,
          razorpay_order_id: resp.razorpay_order_id,
        };
      } else {
        formData = {
          email: email,
          hostId: bookingData.hostId,
          hotelId: bookingData.listing.hotelId,
          listingId: bookingData.listingId,
          type: bookingData.type,
          contact: phone,
          userId: user._id,
          adult,
          children,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          totalPrice:
            bookingData.dayCount *
            bookingData.perRoomPrice *
            bookingData.roomCount,
          status: "booked",
          paymentStatus: "success",
          guestCount: bookingData.guestCount,
          datesArray: bookingData.datesArray,
          razorpay_payment_id: resp.razorpay_payment_id,
          razorpay_order_id: resp.razorpay_order_id,
        };
      }

      // Send a request to your server to save data to the databases
      const response = await axios.post(API_22, formData);

      if (response.status === 200) {
        dispatch(
          setBookingData({
            bookingData: {
              ...bookingData,
              bookingNo: response.data._id,
              razorpay_order_id: response.data.razorpay_order_id,
              email,
              phone,
              add,
              pin,
              country,
              clientName,
            },
          })
        );
        // You can show a success message to the user
      } else {
        console.error("Error saving data:", response.data.error);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error saving data:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <>
      <LoginPopup />
      <div>
        <Backdrop show={formIsShown} backdropClose={closeee} />
        <div
          className="container p-5  checkoutmainbox"
          style={{ height: "fit-content", position: "relative" }}
        >
          {Array.isArray([mm1]) &&
            [mm1].map((elm) => {
              return (
                <div
                  className=""
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "25px",
                  }}
                >
                  <div className="col-md-6 mx-5">
                    <div
                      className="heading-1"
                      style={{
                        borderBottom: "1px solid grey",
                        fontSize: "25px",
                      }}
                    >
                      <h3>Checkout </h3>
                    </div>

                    <div
                      className="cartDetails my-4 d-flex"
                      style={{ paddingTop: "5px" }}
                    >
                      <div className="Images">
                        <img
                          src={`${API_3}${elm.img.replace("public", "")}`}
                          alt="sklfjls"
                          style={{ width: "150px", height: "150px" }}
                        ></img>
                      </div>
                      <div className="Details mx-5">
                        <h6
                          style={{
                            textTransform: "uppercase",
                            color: "blue",
                            letterSpacing: "3px",
                          }}
                        >
                          {elm.roomtype}
                        </h6>

                        <div
                          className="locationtrip my-3"
                          style={{ display: "flex", gap: "10px" }}
                        >
                          <i className="fa-solid fa-location-dot" />
                          <span>{elm.place}</span>
                        </div>

                        <div className="departurDate">
                          <p>
                            Checkin : <span>{elm.startDate}</span>
                          </p>
                        </div>

                        <div className="Duration">
                          <p>Checkout : {elm.endDate}</p>
                        </div>

                        <div className="numberofdaysss">
                          {diff} Days to Stay = {elm.dayCount} x{" "}
                          {elm.perRoomPrice} = {elm.dayCount * elm.perRoomPrice}
                        </div>

                        <div className="bookingDetails my-3">
                          {/* <p>Adult : 2 </p>
                          <p>Children : 1</p> */}
                          <p>Guests: {bookingData.guestCount}</p>
                          <p
                            style={{
                              display: elm.type === "Rooms" ? "" : "none",
                            }}
                          >
                            Rooms :{elm.roomCount}
                          </p>

                          <div className="total ">
                            Total amount : ₹{" "}
                            {elm.dayCount * elm.perRoomPrice * elm.roomCount}
                          </div>
                        </div>
                      </div>
                      <div
                        className="Pricesss "
                        style={{ fontSize: "25px", marginLeft: "45px" }}
                      >
                        {elm.price}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4" style={{ marginTop: "6px" }}>
                    <div className="carttotal">
                      <h3>Checkout totals</h3>
                    </div>

                    <div
                      className="cardtotalbox p-3"
                      style={{ border: "1px solid grey" }}
                    >
                      <div
                        className="box3"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          // background:"black",
                        }}
                      >
                        <div className="d-flex justify-content-between  my-3">
                          <span>Subtotal</span>
                          <span>
                            ₹ {elm.dayCount * elm.perRoomPrice * elm.roomCount}
                          </span>
                        </div>

                        <div
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "10px" }}
                        >
                          <span>Total</span>
                          <span>
                            ₹ {elm.dayCount * elm.perRoomPrice * elm.roomCount}
                          </span>
                        </div>

                        <center>
                          <button
                            className="btn  my-2 "
                            style={{ background: "#67c7b9" }}
                            onClick={showsss}
                          >
                            Proceed to checkout
                          </button>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {formIsShown && (
          <div id="form-container" className="form-container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                checkout(amount);
              }}
              className="form"
            >
              <h2>Fill Your Details</h2>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Name"
                  value={clientName}
                  required
                  onChange={(e) => {
                    setClientName(e.target.value);
                  }}
                  style={{}}
                />

                <input
                  type="text"
                  id="email"
                  class="floatLabel"
                  name="email"
                  value={email}
                  required
                  placeholder="email"
                  disabled
                />
              </div>

              <input
                type="text"
                id="street"
                class="floatLabel"
                name="street"
                required
                value={add}
                placeholder="Adress"
                onChange={(e) => {
                  setadd(e.target.value);
                }}
                style={{ width: "100%" }}
              />

              <div className="input-container">
                <input
                  type="tel"
                  id="phone"
                  class="floatLabel"
                  name="phone"
                  value={phone}
                  required
                  placeholder="Phone"
                  onChange={(e) => {
                    setphone(e.target.value);
                  }}
                />

                <input
                  type="text"
                  id="post-code"
                  class="floatLabel"
                  name="post-code"
                  required
                  value={pin}
                  placeholder="Pin-code"
                  onChange={(e) => {
                    setpin(e.target.value);
                  }}
                />
              </div>

              <input
                type="text"
                id="country"
                class="floatLabel"
                name="country"
                placeholder="Country"
                required
                value={country}
                onChange={(e) => {
                  setcountry(e.target.value);
                }}
              />

              <div className="input-container">
                <button
                  type="submit"
                  value="Submit"
                  class="col-1-4 w-100"
                  style={{ background: "#67c7b9" }}
                >
                  Submit
                </button>
                <button
                  class="col-1-4 w-100 closebtn"
                  style={{ background: "red" }}
                  onClick={closeee}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}
