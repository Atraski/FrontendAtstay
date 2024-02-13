import { Divider } from "antd";
import "./Form.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_3, API_4, API_5, API_6 } from "../api/api";
function Form2() {
  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [phone, setphone] = useState("");
  const [add, setadd] = useState("");
  const [street, setstreet] = useState("");
  const [pin, setpin] = useState("");
  const [country, setcountry] = useState("");
  const adult = parseInt(localStorage.getItem("adult")) || 0;
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

  const navigate = useNavigate();

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
          adult,
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
    <>
      {/* Make <select> easier to select */}

      <Navbar></Navbar>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkout(amount);
        }}
      >
        <div class="form-group">
          <h2 class="heading">Fill Your Details</h2>
          <div class="controls">
            <label></label>

            <input
              type="text"
              placeholder="Name"
              value={name}
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
            <div class="col-1-3">
              <div class="controls">
                <input
                  type="number"
                  id="street-number"
                  class="floatLabel"
                  required
                  value={street}
                  name="street-number"
                  placeholder="Number"
                  onChange={(e) => {
                    setstreet(e.target.value);
                  }}
                />
                <label for="street-number"></label>
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
              value={country}
              onChange={(e) => {
                setcountry(e.target.value);
              }}
            />
            <label for="country"></label>
          </div>
        </div>
        <button type="submit" value="Submit" class="col-1-4">
          Submit
        </button>
      </form>
      <Footer></Footer>
    </>
  );
}
export default Form2;
