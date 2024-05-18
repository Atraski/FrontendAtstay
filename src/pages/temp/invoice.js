import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";
import "./invoice.css";
import { API_19 } from "../../api/api";
import { useSelector } from "react-redux";

function Invoice() {
  // Image URL
  const img = "http://Atstay.in/assets/logo.webp";

  const bookingData = useSelector((state) => state.bookingData);

  const tempHost = useSelector((state) => state.tempHost);
  const user = useSelector((state) => state.user);
  console.log("user", user);
  console.log("bookingData", bookingData);

  const handleDownload = () => {
    const element = document.getElementById("invoice-container");
    html2pdf(element);

    const s = element.innerHTML; // Send invoice HTML to the server
    localStorage.setItem("html", s);
    console.log(s, "PDF");
  };
  useEffect(() => {
    const element = document.getElementById("invoice-container");

    sendInvoiceByEmail(element.innerHTML);
  });
  const sendInvoiceByEmail = async (invoiceHTML) => {
    try {
      const response = await fetch(API_19, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientEmail: bookingData.email,
          invoiceHTML: invoiceHTML,
          hostEmail: tempHost.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Email sent successfully");
      } else {
        console.error("Error sending email:", result.error);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const date1 = localStorage.getItem("curdate");

  let orderId;
  if (bookingData.razorpay_order_id) {
    orderId = bookingData.razorpay_order_id.split("_")[1];
  }

  return (
    <>
      <div
        style={{
          width: "60%",
          margin: "auto",
          padding: "20px 40px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        id="invoice-container"
      >
        <div width="90%" className="invoice-data" style={{ margin: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div>
              <img
                src={img}
                alt="Atstay"
                style={{ width: "90px", height: "90px", marginLeft: "-1rem" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "2.3rem",
                    marginTop: "-1rem",
                  }}
                >
                  Invoice
                </h1>
              </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <span>Atstay </span>
              <br />
              640, Second floor, 262, Westend Marg, Saidulajab <br /> New Delhi
              - 110030
              <br />
              India
              <br />
              VAT Reg #: 9919SGP29004OSJ
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem 0 1rem 0",
              borderTop: "1px solid",
            }}
          >
            <div>
              <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                Billed To
              </span>
              <br />
              {bookingData.clientName}
              <br />
              {`${bookingData.add} - ${bookingData.pin}`}
              <br />
              India
              <br />
              Email : {bookingData.email}
              <br />
              MOB : {bookingData.phone}
            </div>
            <div style={{ width: "43%" }}>
              Invoice # HSG-841693
              <br />
              Invoice Date # {date1}
              <br />
              Invoice Amount # ₹
              {bookingData.dayCount *
                bookingData.perRoomPrice *
                bookingData.roomCount}
              .00 (INR)
              <br />
              Order Nr. # {orderId}
              <br />
              PAID
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem 0 1rem 0",
              borderTop: "1px solid",
              borderBottom: "1px solid",
            }}
          >
            <div className="client-address">
              <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                Hotel Details
              </span>
              <br />
              {bookingData.listing.title}
              <br />
              {`${bookingData.listing.streetAddress},${bookingData.listing.province}`}
              <br />
              {`${bookingData.listing.city} - ${bookingData.listing.pincode}`}
              <br />
              {bookingData.listing.country}
              <br />
            </div>
            <div>
              <h3 style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                CheckIn
              </h3>
              <span>{bookingData.startDate}</span>
            </div>
            <div>
              <h3 style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                CheckOut
              </h3>
              <span>{bookingData.endDate}</span>
            </div>
          </div>
          <div
            className="booking-details"
            style={{ paddingTop: "1rem", width: "100%", margin: "auto" }}
          >
            <h1
              style={{
                fontSize: "1rem",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Booking Id - #{bookingData.bookingNo}
            </h1>
            <table width="100%" style={{ textAlign: "center", margin: "auto" }}>
              <tr>
                <th>Room Type</th>
                <th>Guests</th>
                <th>Total Rooms</th>
                <th>Price</th>
              </tr>

              <tr>
                <td style={{ textTransform: "capitalize" }}>
                  {bookingData.roomType}
                </td>
                <td>{bookingData.guestCount}</td>
                <td>{bookingData.roomCount}</td>
                <td>₹{bookingData.perRoomPrice}</td>
              </tr>
            </table>
          </div>
          <h1
            style={{ textAlign: "right", fontSize: "1.5rem" }}
            className="total-price"
          >
            Total : ₹
            {bookingData.dayCount *
              bookingData.perRoomPrice *
              bookingData.roomCount}
          </h1>
        </div>
      </div>
      <div
        className="button"
        style={{ justifyContent: "center", display: "flex" }}
      >
        <button onClick={handleDownload}>Download PDF</button>
      </div>
    </>
  );
}
export default Invoice;
