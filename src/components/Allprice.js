import React, { useState, useEffect } from "react";
import { productData } from "./Atstaysdata";
import { useParams } from "react-router-dom";
import "./Allprice.css";
import { API_1, API_2 } from "../api/api";

export default function Allprice() {
  const [data, Setdata] = useState(productData);
  const params = useParams();

  // const ss = data.filter((ds) => ds.id == params.id)

  const [allRooms, setAllRooms] = useState([]);
  const cms = data.filter((ds) => ds.id == allRooms.id);
  console.log(cms, "sss");
  const [bg, setBackgroundColor] = useState("");
  const [bg1, setColor1] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  // const [allRooms, setAllRooms] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);

  console.log(allRooms, "room");
  useEffect(() => {
    // Fetch all room data when the component mounts
    fetchAllRooms();
  }, []);
  const fetchAllRooms = async () => {
    try {
      const response = await fetch(API_1);
      const data = await response.json();

      console.log("Fetched data:", data); // Log the fetched data

      if (data && data.length > 0) {
        const lastUpdateDate = new Date(data[0].lastUpdate);
        const currentDate = new Date();
        const isUpdatedToday =
          lastUpdateDate.toDateString() === currentDate.toDateString();

        setBackgroundColor(isUpdatedToday ? "white" : "");
        setColor1(isUpdatedToday ? "black" : "");
      } else {
        console.warn("No room data found");
      }

      setAllRooms(data);
    } catch (error) {
      console.error("Error fetching all room data:", error);
    }
  };

  const handleDelete = async (roomId) => {
    try {
      // Send a DELETE request to the server to delete the room
      await fetch(`${API_2}${roomId}`, {
        method: "DELETE",
      });

      // Fetch the updated data after deletion
      fetchAllRooms();
      //   setIsUpdated(true);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleUpdate = async (roomId, index) => {
    try {
      // Send a PUT request to update the room data
      await fetch(`${API_2}${roomId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(/* your updated data here */),
      });

      const updatedRowsCopy = [...updatedRows];
      updatedRowsCopy[index] = true;
      setUpdatedRows(updatedRowsCopy);
      fetchAllRooms();

      // Update the local state to indicate that the row is updated
      setIsUpdated(true);

      // Fetch the updated data after updating
      //   fetchAllRooms();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <div>
      <div
        className="container-fluid"
        style={{ height: "100vh", background: "#66cccc" }}
      >
        <h1
          className="heading-1"
          style={{ textAlign: "center", fontWeight: "600", color: "black" }}
        >
          Atstay Admin Pannel
        </h1>
        <table
          className="mt-5"
          style={{
            width: "100%",
            textAlign: "center",
            color: "black ",
            border: "3px solid white",
          }}
        >
          <tr className="jj">
            <th>Property Name</th>
            <th>Premium Rooms Price</th>
            <th>Normal Rooms Price</th>
            <th>Advance Rooms Price </th>
            {/* <th>No Of Rooms Available</th> */}
            <th>No. of Premium</th>
            <th>No. of Normal</th>
            <th>No. of Advance</th>

            <th></th>
            <th></th>
          </tr>
          {allRooms.map((rm, index) => {
            return (
              <>
                {/* <span> property name-</span>    <span>{rm.trip}</span>
                        <span> premium romm-</span>   <span>{rm.roomprice}</span>
                        <span> normal room-</span>  <span>{rm.roomprice1}</span>
                        <span> advance room-</span>   <span>{rm.roomprice2}</span>
                        <span> no of rooms avilable-</span>   <span>{rm.room}</span>  */}

                <tr
                  className="jjs"
                  key={rm._id}
                  style={{
                    backgroundColor: updatedRows[index] ? "green" : bg,
                    color: updatedRows[index] ? "white" : bg1,
                  }}
                >
                  <th>{rm.trip}</th>
                  <th>{rm.roomprice}</th>
                  <th>{rm.roomprice1}</th>
                  <th>{rm.roomprice2}</th>
                  <th>{rm.roomno1}</th>
                  <th>{rm.roomno2}</th>
                  <th>{rm.roomno3}</th>
                  <th>
                    <button
                      onClick={() => handleUpdate(rm._id, index)}
                      style={{ margin: "0px", background: "green" }}
                    >
                      Update
                    </button>
                  </th>

                  <th>
                    <button
                      onClick={() => handleDelete(rm._id)}
                      style={{ margin: "0px" }}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
}
