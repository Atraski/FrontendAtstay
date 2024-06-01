import axios from "axios";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { useNavigate, useParams } from "react-router-dom";
import { API_26 } from "../../api/api";

import "../../styles/EditAvailability.css";
const EditAvailability = () => {
  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [standard, setStandard] = useState(0);
  const [double, setDouble] = useState(0);
  const [deluxe, setDeluxe] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [datesArray, setDatesArray] = useState([]);

  const navigate = useNavigate();

  const [state, setState] = useState({
    standard: 0,
    double: 0,
    deluxe: 0,
  });
  useEffect(() => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    // console.log("startDate", startDateObj);
    // console.log("endDate", endDateObj);
    const dates = [];
    let currentDate = startDateObj;

    // Loop through each date until the day before the end date
    while (currentDate <= endDateObj) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      dates.push(formattedDate);

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDatesArray(dates);
  }, [startDate, endDate]);
  useEffect(() => {
    console.log("Dates Array", datesArray);
  }, [datesArray]);

  useEffect(() => {
    const startdate = new Date(dateRange[0].startDate);
    const startyear = startdate.getFullYear();
    const startmonth = String(startdate.getMonth() + 1).padStart(2, "0");
    const startday = String(startdate.getDate()).padStart(2, "0");
    const startformattedDate = `${startyear}-${startmonth}-${startday}`;
    setStartDate(startformattedDate);
    const enddate = new Date(dateRange[0].endDate);
    const endyear = enddate.getFullYear();
    const endmonth = String(enddate.getMonth() + 1).padStart(2, "0");
    const endday = String(enddate.getDate()).padStart(2, "0");
    const endformattedDate = `${endyear}-${endmonth}-${endday}`;
    setEndDate(endformattedDate);
  }, [dateRange]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection

    setDateRange([ranges.selection]);
  };
  const { hotelId, type } = useParams();

  const handleChange = (e) => {
    if (e.target.value >= 0) {
      const { name, value } = e.target;
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const CreateAvailabilityRooms = async (date) => {
    try {
      let data;
      if (type === "Rooms") {
        data = {
          date: date,
          type: "Rooms",
          hotelId,
          rooms: [
            {
              roomType: "standard",
              max: state.standard,
              booked: 0,
            },
            {
              roomType: "double",
              max: state.double,
              booked: 0,
            },
            {
              roomType: "deluxe",
              max: state.deluxe,
              booked: 0,
            },
          ],
        };
      } else {
        data = {
          startDate: datesArray[0],
          endDate: datesArray[datesArray.length - 1],
          type: "An entire place",
          hotelId,
        };
      }
      const resp = await axios.post(`${API_26}`, data);

      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    datesArray.forEach((element) => {
      // console.log(element);
      CreateAvailabilityRooms(element);
    });
    navigate("/create-availability");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Create Your Availability</h1>
      <div className="date-container">
        <div className="hotel-id"> Hotel Id : {hotelId}</div>
        <div className="calender">
          <DateRange ranges={dateRange} onChange={handleSelect} />
        </div>
        {type === "Rooms" && (
          <div className="input-field-container">
            <label htmlFor="standard">
              Number of Standard Rooms:
              <input
                type="number"
                value={state.standard}
                onChange={(e) => handleChange(e)}
                id="standard"
                name="standard"
              />
            </label>
            <label htmlFor="double">
              Number of Double Rooms :
              <input
                type="number"
                value={state.double}
                onChange={(e) => handleChange(e)}
                id="double"
                name="double"
              />
            </label>
            <label htmlFor="deluxe">
              Number of Deluxe Rooms :
              <input
                type="number"
                value={state.deluxe}
                onChange={(e) => handleChange(e)}
                id="deluxe"
                name="deluxe"
              />
              <p></p>
            </label>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexGrow: "1",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={() => handleClick()}>Create Availability</button>
        </div>
      </div>
    </div>
  );
};

export default EditAvailability;
