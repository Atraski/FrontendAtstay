import { API_3 } from "../api/api";

const ReservationList = ({ bookingData }) => {
  return (
    <div className="booking-data-container">
      {bookingData.map((booking, index) => {
        <div className="booking-data" key={index}>
          <div className="item">Booking No : {booking._id}</div>
          <div className="booking-date">Booked At : {booking.createdAt}</div>
          <div className="hotel-id">Hotel Id : {booking.hotelId}</div>
          <div className="check-in">Check In Date : {booking.startDate}</div>
          <div className="check-out">Check Out Date : {booking.endDate}</div>

          <div className="total-price">Total Price : {booking.totalPrice}</div>
          <div className="place-type">
            Type :{" "}
            {booking.placeType !== "An entire place"
              ? `${booking.roomType} Room`
              : "Entire place"}
          </div>
          <div
            className="room-count"
            style={{
              display: booking.placeType === "Rooms" ? "" : "none",
            }}
          >
            Room Count : {booking.roomCount}
          </div>
        </div>;
        {
          /* <div className="image-container">
        <img
          src={`${API_3}${ele.listing.listingPhotoPaths[0].replace(
            "public",
            ""
          )}`}
          alt=""
          srcset=""
        />
      </div> */
        }
      })}
    </div>
  );
};

export default ReservationList;
