import React, { useEffect, useState } from "react";
import { API_12, API_13, API_14, API_3 } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// const BookingForm = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [amount, setAmount] = useState();
//   const bookingData = useSelector((state) => state?.bookingData);

//   useEffect(() => {
//     setAmount(bookingData.totalPrice);
//   }, []);

//   const navigate = useNavigate();
//   const checkout = async (amount) => {
//     localStorage.setItem("amount", amount); // Set the 'amount' in localStorage\
//     try {
//       if (contact.length > 9) {
//         var data1 = await fetch("https://localhost:5000/Order4", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, amount }),
//         });

//         var keys = await fetch("https://localhost:5000/key", {
//           method: "GET",
//         });
//         keys = await keys.json();
//         console.log(keys, "yes");
//         data1 = await data1.json();

//         // const keys='rzp_test_OmCfFJhnp3Fztn'
//         console.log(keys);
//         console.log(data1.amount);
//         console.log(data1.id);
//         console.log(data1);
//       } else {
//         alert("Please Enter Valid Number");
//       }
//       if (data1.success) {
//         const options = {
//           key: keys.key, // Enter the Key ID generated from the Dashboard
//           amount: data1.order.tot, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//           currency: "INR",
//           name: "Atraski Model Registration", //your business name
//           description: "",
//           // image: "https://example.com/your_logo",
//           order_id: data1.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//           callback_url: "https://localhost:5000/verification",
//           handler: function (response) {
//             // Handle the payment success callback here
//             console.log("Payment successful: ", response);
//             try {
//               navigate("/");
//             } catch (error) {
//               console.error("Navigation error:", error);
//             }
//             // You can navigate to a success page or perform further actions here

//             // Save data to the database (you need to implement this on your backend)
//             saveDataToDatabase();
//           },
//           // prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
//           //     name: "Gaurav Kumar", //your customer's name
//           //     email: "gaurav.kumar@example.com",
//           //     contact: "9000090000" //Provide the customer's phone number for better conversion rates
//           // },

//           notes: {
//             address: "Razorpay Corporate Office",
//           },
//           theme: {
//             color: "#ffc0cb",
//           },
//         };
//         const rzp1 = new window.Razorpay(options);

//         rzp1.on("payment.success", function (response) {
//           // Payment was successful, now save data to the database
//           saveDataToDatabase();
//           console.log("Payment successful:", response);
//           // You can navigate to a success page or perform further actions here
//         });

//         rzp1.open();
//       } else {
//         // console.error("Error creating Razorpay order:", data.error);
//         // Handle the error, e.g., show an error message to the user
//       }
//     } catch (error) {
//       console.error("Error processing payment:", error);
//       // Handle the error, e.g., show an error message to the user
//     }
//   };

//   return (
//     <div>
//       <div className="title"></div>
//       <div className="form">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             checkout(amount);
//           }}
//         >
//           <div>
//             <label htmlFor="firstName">First Name:</label>
//             <input
//               type="text"
//               id="firstName"
//               value={firstName}
//               onChange={(event) => setFirstName(event.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="lastName">Last Name:</label>
//             <input
//               type="text"
//               id="lastName"
//               value={lastName}
//               onChange={(event) => setLastName(event.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="email">Contact:</label>
//             <input
//               type="contact"
//               id="contact"
//               value={contact}
//               onChange={(event) => setContact(event.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

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
        console.log(keys, "yes");
        data1 = await data1.json();

        console.log(keys);
        console.log(data1.amount);
        console.log(data1.id);
        console.log(data1);

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
