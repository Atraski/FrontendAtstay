import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Snackbar } from "@mui/material";
import { setShowPopup, setWishList } from "../redux/state";
import addCommasToPrice from "../utility/addCommasToPrice";
import { API_1, API_20, API_3 } from "../api/api";
import "../styles/ListingCard.scss";

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

  const [isFavorite, setIsFavorite] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [favoriteIsLoading, setFavoriteIsLoading] = useState(false);

  const { vertical, horizontal, open } = isFavorite;

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const modifiedPrice = addCommasToPrice(price);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ADD TO WISHLIST */
  const user = useSelector((state) => state.user);
  const host = useSelector((state) => state.host);

  const wishlist = user?.wishList || [];

  const isLiked = wishlist?.find((item) => item.toString() === listingId);

  // let isLiked;

  const patchWishList = async () => {
    if (user == null) {
      return dispatch(setShowPopup({ popup: true }));
    }
    if (user?._id !== creator) {
      setFavoriteIsLoading(true);
      const response = await fetch(`${API_20}${user?._id}/${listingId}`, {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
      });
      setIsFavorite({ vertical: "bottom", horizontal: "left", open: true });
      setFavoriteIsLoading(false);
      setSnackbarMessage(
        !isLiked ? "Added to Wishlist" : "Removed from Wishlist"
      );
      const data = await response.json();

      dispatch(setWishList(data.wishList));
    } else {
      return;
    }
  };

  const favoriteHandler = (e) => {
    e.stopPropagation();
    patchWishList();
    // setIsFavorite({ vertical: "bottom", horizontal: "left", open: true });
    // setSnackbarMessage(
    //   !isLiked ? "Added to Wishlist" : "Removed from Wishlist"
    // );
  };

  const snackbarCloseHandler = () => {
    setIsFavorite({ ...isFavorite, open: false });
  };

  return (
    <Fragment>
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
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
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

        <h3 className="location">
          <FontAwesomeIcon
            icon={faLocationDot}
            size="sm"
            style={{ color: "#ffffff", marginRight: "5px" }}
          />
          {`${city}, ${province}`}
          {/* {city}, {province}, {country} */}
        </h3>
        {/* <p>{category}</p> */}

        <>
          <p>
            <span>
              Rs.{" "}
              {type === "Rooms"
                ? rooms &&
                  (rooms[0].price === 0
                    ? rooms[1].price === 0
                      ? addCommasToPrice(rooms[2].price)
                      : addCommasToPrice(rooms[1].price)
                    : addCommasToPrice(rooms[0].price))
                : modifiedPrice}
            </span>{" "}
            per night
          </p>
        </>

        {host === null && (
          <button className="favorite" onClick={favoriteHandler}>
            {favoriteIsLoading ? (
              <CircularProgress
                sx={isLiked ? { color: "white" } : { color: "red" }}
                size={30}
              />
            ) : isLiked ? (
              <Favorite sx={{ color: "red" }} />
            ) : (
              <Favorite sx={{ color: "white" }} />
            )}
          </button>
        )}
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={snackbarCloseHandler}
        message={
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              fontSize: "1rem",
            }}
          >
            {snackbarMessage}
            <Link
              to={`/${user?._id}/wishList`}
              style={{
                color: "#67c7b9",
                textDecoration: "underline",
              }}
            >
              Wishlist
            </Link>
          </span>
        }
        key={vertical + horizontal}
      />
    </Fragment>
  );
};

export default ListingCard;
