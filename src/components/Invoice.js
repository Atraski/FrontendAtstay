import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import logo from "../images/atstaylogo.webp";
import "./invoice.css";
import { API_8 } from "../api/api";

function Invoice() {
  const name = localStorage.getItem("NAME");
  const add = localStorage.getItem("add");
  const mail = localStorage.getItem("mail");
  const phone = localStorage.getItem("phone");
  const amount = localStorage.getItem("amount");
  const namess = localStorage.getItem("namess");
  const trips = localStorage.getItem("trip");

  const handleDownload = () => {
    const element = document.getElementById("invoice-container");
    html2pdf(element);
    // sendInvoiceByEmail(element.innerHTML);
    const s = element.innerHTML; // Send invoice HTML to the server
    localStorage.setItem("html", s);
    console.log(s);
  };
  useEffect(() => {
    const element = document.getElementById("invoice-container");

    sendInvoiceByEmail(element.innerHTML);
  });
  const sendInvoiceByEmail = async (invoiceHTML) => {
    try {
      const response = await fetch(API_8, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientEmail: mail,
          invoiceHTML: invoiceHTML,
        }),
      });
      console.log("kkkkk");

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

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = currentDate.getDate();
    day = day < 10 ? "0" + day : day;
    return `${day}-${month}-${year}`;
  }

  const date = localStorage.setItem("curdate", selectedDate);
  const date1 = localStorage.getItem("curdate");
  const mmmm = localStorage.getItem("orderr");

  return (
    <>
      {/* <div id="invoice-container"> */}
      <div className="" id="invoice-container">
        <table
          width="90%"
          className=""
          style={{ margin: "auto", marginBottom: "60px" }}
        >
          <img
            src={logo}
            height="50px"
            width="50px"
            style={{ textAlign: "left" }}
          />
          <tr style={{ textAlign: "left", height: "100px" }}>
            <th>
              Atstay <br />
              640, Second floor, 262, Westend Marg, Saidulajab New Delhi -
              110030
              <br />
              India
              <br />
              VAT Reg #: 9919SGP29004OSJ
            </th>

            <th style={{ textAlign: "right" }}>
              Invoice # HSG-841693
              <br />
              Invoice Date # {date1}
              <br />
              Invoice Amount # ₹{amount}.00 (INR)
              <br />
              Order Nr. # {mmmm}
              <br />
              PAID
            </th>
          </tr>

          <tr style={{ textAlign: "left", height: "200px" }}>
            <th>
              BILLED TO
              <br />
              {namess}
              <br />
              IN19CCDPD5287P1ZY
              <br />
              {add}
              <br />
              India
              <br />
              {mail}
              <br />
              {phone}
            </th>
          </tr>
        </table>

        <table
          width="100%"
          style={{ textAlign: "center", border: "1px solid black" }}
        >
          <tr>
            <td
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            >
              Description
            </td>
            <td
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            >
              Price
            </td>
            <td
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            >
              TOTAL EXCL. VAT
            </td>
            <td
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            >
              AMOUNT (INR)
            </td>
          </tr>

          <tr>
            <th
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            >
              {trips}
            </th>
            <th
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            >
              {amount}
            </th>
            <th
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            >
              -----
            </th>
            <th
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            >
              {amount}
            </th>
          </tr>

          <tr>
            <th
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            ></th>
            <th
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            ></th>
            <th
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            >
              0
            </th>
            <th
              className="jsm"
              style={{
                width: "200px",
                border: "1px solid black",
                padding: "15px",
              }}
            >
              ₹{amount}.00 (INR)
            </th>
          </tr>
        </table>
      </div>

      {/* </div> */}

      <button onClick={handleDownload}>Download PDF</button>
    </>
  );
}
export default Invoice;
