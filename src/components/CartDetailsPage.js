import React, { useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { productData1 } from "./Atstaynextdata";
import { productData6 } from "./Atstaynextprice";
import Footers from "./Footer";
import Footer from "./Footer";

import { useNavigate } from "react-router-dom";
import "./CartDetailspage.css";
import { API_3, API_4, API_5, API_6 } from "../api/api";

export default function CartDetailsPage() {
  const [mm, setMM] = useState(productData6);
  const params = useParams();
  const mm1 = mm.filter((datas) => datas.id == params.id);

  const adult = localStorage.getItem("adult");
  const child = localStorage.getItem("child");
  const room = localStorage.getItem("room");
  const checkinn = localStorage.getItem("checkin");
  const checkoutt = localStorage.getItem("checkout");
  const diff = localStorage.getItem("numberOfDays");

  const navigate = useNavigate();

  const amunt = room * diff;
  console.log(amunt);
  const amunt2 = amunt * mm1[0].price;
  console.log(amunt2);
  console.log(mm1[0].price);

  localStorage.setItem("amunt", amunt2);

  //Form Code

  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [phone, setphone] = useState("");
  const [add, setadd] = useState("");
  const [street, setstreet] = useState("");
  const [pin, setpin] = useState("");
  const [country, setcountry] = useState("");
  const adult1 = parseInt(localStorage.getItem("adult")) || 0;
  const children = parseInt(localStorage.getItem("child")) || 0;
  const selectedDate = localStorage.getItem("selectedDate") || "";
  const amount = localStorage.getItem("amunt") || "";
  const adds = localStorage.setItem("add", add) || "";
  const mails = localStorage.setItem("mail", mail) || "";
  const phones = localStorage.setItem("phone", phone) || "";
  const namess = localStorage.setItem("namess", name);
  const tripname = localStorage.getItem("trip");
  const checkoutDate = localStorage.getItem("checkout");
  const checkin = localStorage.getItem("checkin");
  const rooms = localStorage.getItem("room");
  console.log(adds);
  console.log(selectedDate, "ll");

  // const navigate = useNavigate()

  const showsss = () => {
    const show = document.querySelector(".showsss");
    show.style.display = "block";
    show.style.overflow = "hidden"; // Enable scrolling for the specific element
  };

  const closeee = () => {
    const show = document.querySelector(".showsss");
    show.style.display = "none";
  };

  const checkout = async (amount) => {
    localStorage.setItem("amount", amount); // Set the 'amount' in localStorage\
    try {
      if (phone.length === 10) {
        var data1 = await fetch(API_3, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });
        if (data1.success) {
          const responseData = await data1.json();
          // console.log('yyyy',responseData.order.id)
          const orderrr = localStorage.setItem("orderr", responseData.order.id);
        }
        // const orderid=responseData.order.id;

        var keys = await fetch(API_4, {
          method: "GET",
        });
        keys = await keys.json();
        console.log(keys, "yes");
        data1 = await data1.json();

        // const keys='rzp_test_OmCfFJhnp3Fztn'
        console.log(keys);
        console.log(data1.amount);
        console.log(data1.id);
        console.log(data1);
      } else {
        alert("Please Enter Valid Number");
      }
      if (data1.success) {
        const options = {
          key: keys.key, // Enter the Key ID generated from the Dashboard
          amount: data1.order.tot, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Acme Corp", //your business name
          description: "Test Transaction",
          // image: "https://example.com/your_logo",
          order_id: data1.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: API_5,
          handler: function (response) {
            // Handle the payment success callback here
            console.log("Payment successful: ", response);
            try {
              navigate("/invoice");
            } catch (error) {
              console.error("Navigation error:", error);
            }
            // You can navigate to a success page or perform further actions here

            // Save data to the database (you need to implement this on your backend)
            saveDataToDatabase();
          },
          prefill: {
            //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            name: "Gaurav Kumar", //your customer's name
            email: "gaurav.kumar@example.com",
            contact: "9000090000", //Provide the customer's phone number for better conversion rates
          },

          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new window.Razorpay(options);

        rzp1.on("payment.success", function (response) {
          // Payment was successful, now save data to the database
          saveDataToDatabase();
          console.log("Payment successful: ", response);
          // You can navigate to a success page or perform further actions here
        });

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

  const saveDataToDatabase = async () => {
    try {
      const paisa = localStorage.getItem("amunt2");

      // Send a request to your server to save data to the databases
      const response = await fetch(API_6, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mail,
          phone,
          street,
          add,
          pin,
          rooms,
          country,
          amount,
          adult1,
          checkin,
          checkoutDate,
          children,
          tripname,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Data saved successfully:", data);
        // You can show a success message to the user
      } else {
        console.error("Error saving data:", data.error);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error saving data:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <div className="container p-5">
        {mm1.map((elm) => {
          return (
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <div className="col-md-7">
                <div
                  className="heading-1"
                  style={{ borderBottom: "1px solid grey", fontSize: "25px" }}
                >
                  <h3>Cart Items</h3>
                </div>

                <div className="cartDetails my-4 d-flex">
                  <div className="Images">
                    <img
                      src={elm.imgs}
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

                    {/* <div className="tourtype">
                            <p>Type Tour : Daliy Tour</p> 
                            </div> */}

                    <div className="departurDate">
                      <p>
                        Checkin : <span>{checkinn}</span>
                      </p>
                    </div>

                    <div className="Duration">
                      <p>Checkout : {checkoutt}</p>
                    </div>

                    <div className="numberofdaysss">
                      {diff} Days to Stay = {diff} x {elm.price} ={" "}
                      {diff * elm.price}
                    </div>

                    <div className="bookingDetails my-3">
                      <p>Adult : {adult} </p>
                      <p>Children : {child}</p>
                      <p>
                        Number of Room : {room} = {room} x {diff * elm.price} ={" "}
                        {room * diff * elm.price}
                      </p>
                      <div className="total">
                        Total amount : ₹ {room * diff * elm.price}
                      </div>
                    </div>
                  </div>
                  <div
                    className="Pricesss "
                    style={{ fontSize: "25px", marginLeft: "45px" }}
                  >
                    ₹ {elm.price}
                  </div>
                </div>
              </div>

              <div className="col-md-4 mx-5">
                <div className="carttotal">
                  <h3>Cart totals</h3>
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
                    }}
                  >
                    <div className="d-flex justify-content-between my-3">
                      <span>Subtotal</span>
                      <span>₹ {room * diff * elm.price}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Total</span>
                      <span>₹ {room * diff * elm.price}</span>
                    </div>

                    <center>
                      <button
                        className="btn btn-primary my-3"
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

      <div className="showsss" id="form-container">
        <div style={{ background: "rgba(0,0,0,0.8)" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              checkout(amount);
            }}
          >
            <div class="form-group">
              <h2 class="heading">Fill Your Details</h2>
              <div class="controls">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  required
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  style={{}}
                />
              </div>
              <div class="controls">
                <input
                  type="text"
                  id="email"
                  class="floatLabel"
                  name="email"
                  value={mail}
                  required
                  placeholder="email"
                  onChange={(e) => {
                    setmail(e.target.value);
                  }}
                />
                <label for="email"></label>
              </div>
              <div class="controls">
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
                <label for="phone"></label>
              </div>
              <div class="grid">
                <div class="col-2-3">
                  <div class="controls">
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
                    />
                    <label for="street"></label>
                  </div>
                </div>
              </div>
              <div class="grid">
                {/* <div class="col-2-3">
          <div class="controls">
            <input type="text" id="city" class="floatLabel" name="city" placeholder='City' />
            <label for="city"></label>
          </div>         
        </div> */}
                <div class="col-1-3">
                  <div class="controls">
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
                    <label for="post-code"></label>
                  </div>
                </div>
              </div>
              <div class="controls">
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
                <label for="country"></label>
              </div>
            </div>
            <div className="d-flex" style={{ width: "30%", gap: "20px" }}>
              <button type="submit" value="Submit" class="col-1-4 w-100">
                Submit
              </button>
              <span
                class="col-1-4 w-100 closebtn"
                style={{ background: "red" }}
                onClick={closeee}
              >
                Cancel
              </span>
            </div>
          </form>
        </div>
      </div>
      <Footers />
    </div>
  );
}
