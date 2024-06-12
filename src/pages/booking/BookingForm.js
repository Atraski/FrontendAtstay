import React, { useEffect, useState } from "react";
import { API_12, API_13, API_14, API_3 } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BookingForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState();
  const bookingData = useSelector((state) => state?.bookingData);

  useEffect(() => {
    setAmount(bookingData?.totalPrice); // Ensure bookingData is not undefined
  }, [bookingData]);

  const navigate = useNavigate();

  const checkout = async (amount) => {
    localStorage.setItem("amount", amount); // Set the 'amount' in localStorage
    try {
      if (contact.length > 9) {
        let data1 = await fetch(`${API_3}/Order4`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, amount }),
        });

        if (!data1.ok) {
          throw new Error("Failed to fetch");
        }

        let keys = await fetch(`${API_3}key`, {
          method: "GET",
        });

        if (!keys.ok) {
          throw new Error("Failed to fetch");
        }

        keys = await keys.json();

        data1 = await data1.json();

        if (data1.success) {
          const options = {
            key: keys.key,
            amount: data1.order.tot,
            currency: "INR",
            name: "Atraski Model Registration",
            description: "",
            order_id: data1.order.id,
            callback_url: `${API_3}verification`,
            handler: function (response) {
              console.log("Payment successful: ", response);
              try {
                navigate("/");
              } catch (error) {
                console.error("Navigation error:", error);
              }
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#ffc0cb",
            },
          };
          const rzp1 = new window.Razorpay(options);

          rzp1.on("payment.success", function (response) {
            console.log("Payment successful:", response);
          });

          rzp1.open();
        } else {
          // Handle the error, e.g., show an error message to the user
        }
      } else {
        alert("Please Enter Valid Number");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <div className="title"></div>
      <div className="form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkout(amount);
          }}
        >
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
