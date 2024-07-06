import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoginPopup from "../../components/LoginPopup";
import { setBookingData, setShowPopup } from "../../redux/state";
import { API_15, API_16, API_17, API_22, API_3 } from "../../api/api";
import "./CartDetailspage.css";
import Backdrop from "../../utility/Backdrop";
import Card from "../../utility/Card";
import formValidity from "../../utility/formValidity";

export default function CartDetailsPage() {
  const bookingData = useSelector((state) => state.bookingData);
  const user = useSelector((state) => state?.user);
  const listing = useSelector((state) => state?.listings);
  const dispatch = useDispatch();

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

  const adds = localStorage.setItem("add", add) || "";
  const mails = localStorage.setItem("mail", email) || "";
  const phones = localStorage.setItem("phone", phone) || "";
  const namess = localStorage.setItem("namess", clientName);
  const tripname = localStorage.getItem("trip");
  const checkoutDate = localStorage.getItem("checkout");
  const checkin = localStorage.getItem("checkin");
  const rooms = localStorage.getItem("room");

  // const showsss = () => {
  //
  // };

  const totalPrice =
    bookingData.dayCount * bookingData.perRoomPrice * bookingData.roomCount;

  const gst = parseFloat((totalPrice * (18 / 100)).toFixed(2));

  const priceAfterTax = (totalPrice + gst).toFixed(2);

  const checkout = async () => {
    if (!user) {
      dispatch(setShowPopup({ popup: true }));
    }

    console.log(formValidity(clientName, email, add, phone, pin, country));

    const validity = formValidity(clientName, email, add, phone, pin, country);

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

    if (validity.valid) {
      try {
        var data1 = await fetch(API_15, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: priceAfterTax }),
        });

        var keys = await fetch(API_16, {
          method: "GET",
        });
        keys = await keys.json();

        data1 = await data1.json();

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
    } else {
      window.alert("Form not complete!");
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
          totalPrice: priceAfterTax,
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
          totalPrice: priceAfterTax,
          status: "booked",
          paymentStatus: "success",
          guestCount: bookingData.guestCount,
          datesArray: bookingData.datesArray,
          razorpay_payment_id: resp.razorpay_payment_id,
          razorpay_order_id: resp.razorpay_order_id,
        };
      }

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

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <LoginPopup />

      <div>
        {Array.isArray([mm1]) &&
          [mm1].map((elm, index) => {
            return (
              <div className="checkout-container" key={index}>
                <div
                  style={{
                    width: "60%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <button className="back-btn" onClick={backButtonHandler}>
                    Back
                  </button>
                  <h1 className="page-heading">Checkout </h1>
                </div>

                <div className="details-container">
                  <Card>
                    <div className="hotel-details">
                      <div>
                        <h1 className="hotel-title">{elm.listing.title}</h1>
                        <p>{elm.listing.streetAddress}</p>
                      </div>
                      <img
                        src={`${API_3}${elm.img.replace("public", "")}`}
                        alt="Property"
                      ></img>
                    </div>
                    <div className="booking-details-container">
                      <div className="checkin-details">
                        <div className="check-in">
                          <h3>CHECK IN</h3>
                          <p className="date">{elm.startDate}</p>
                        </div>
                        <h4 className="total-days">
                          <span>{elm.dayCount}</span> Nights
                        </h4>
                        <div className="check-out">
                          <h3>CHECK OUT</h3>
                          <p className="date">{elm.endDate}</p>
                        </div>
                      </div>
                      <div className="booking-details">
                        <h4>{elm.dayCount} Nights</h4> |
                        <h4> {bookingData.guestCount} Guests</h4> |
                        <h4>{elm.roomCount} Rooms</h4>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h2>Price</h2>
                    <div className="price-details-container">
                      <div className="price-details">
                        <h4>
                          {elm.roomCount} Rooms X {elm.dayCount} Nights
                        </h4>
                        <h4>₹{totalPrice}</h4>
                      </div>
                      <div className="price-details">
                        <h4>GST (18%)</h4>
                        <h4>₹{gst}</h4>
                      </div>
                      <div className="price-details">
                        <h3>Total</h3>
                        <h3>₹{priceAfterTax}</h3>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="guest-details">
                  <h2>Fill Your Details</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                    className="form"
                  >
                    <div className="input-container">
                      <input
                        type="text"
                        placeholder="Name"
                        value={clientName}
                        required
                        onChange={(e) => {
                          setClientName(e.target.value);
                        }}
                      />

                      <input
                        type="text"
                        id="email"
                        class="floatLabel"
                        name="email"
                        value={email}
                        required
                        placeholder="Email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>

                    <textarea
                      type="text"
                      id="street"
                      class="floatLabel"
                      name="street"
                      required
                      rows={3}
                      value={add}
                      placeholder="Adress"
                      onChange={(e) => {
                        setadd(e.target.value);
                      }}
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
                  </form>
                </Card>

                <div className="pay-btn">
                  <button onClick={checkout}>PAY NOW</button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
