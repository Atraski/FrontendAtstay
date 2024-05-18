import { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShowPopup, setWishList } from "../redux/state";
import { API_1, API_20, API_3 } from "../api/api";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
  photo,
  rooms,
}) => {
  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ADD TO WISHLIST */
  const user = useSelector((state) => state.user);
  // console.log("user", user);
  const wishlist = user?.wishList || [];

  // console.log("wishlist", wishlist);
  const isLiked = wishlist?.find((item) => item.toString() === listingId);
  // console.log("isLiked for ", listingId, " ", isLiked);
  // let isLiked;

  const patchWishList = async () => {
    // console.log("user", user);
    if (user == null) {
      return dispatch(setShowPopup({ popup: true }));
    }
    if (user?._id !== creator) {
      const response = await fetch(`${API_20}${user?._id}/${listingId}`, {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log("Response data", data);
      dispatch(setWishList(data.wishList));
    } else {
      return;
    }
  };

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`${API_3}${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {`${city}, ${province}, ${country}`.slice(0, 33) + "..."}
        {/* {city}, {province}, {country} */}
      </h3>
      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>
              Rs.{" "}
              {type === "Rooms"
                ? rooms &&
                  (rooms[0].price === 0
                    ? rooms[1].price === 0
                      ? rooms[2].price
                      : rooms[1].price
                    : rooms[0].price)
                : price}
            </span>{" "}
            per night
          </p>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>Rs. {totalPrice}</span> total
          </p>
        </>
      )}

      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        // disabled={!user}
      >
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard;
