import "../styles/List.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useEffect } from "react";
import axios from "axios";
import { API_7 } from "../api/api";
import { setListings } from "../redux/state";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);
  const listing = useSelector((state) => state.listings);

  const dispatch = useDispatch();

  const getAllListings = async () => {
    try {
      const resp = await axios.get(API_7);
      dispatch(setListings({ listings: resp.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const data = [];
  for (const elm of listing) {
    const matching = wishList.find((obj) => obj === elm.hotelId);
    if (matching) {
      data.push(elm);
    }
  }
  useEffect(() => {
    getAllListings();
  }, []);
  // useEffect(() => {
  //   console.log("data", data);
  // }, [data]);

  return (
    <>
      {/* <Navbar /> */}
      <h1 className="title-list">Your Wish List</h1>

      <div className="list">
        {data.length !== 0 ? (
          data.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
              rooms,
              hotelId,
            }) => (
              <ListingCard
                listingId={hotelId}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
                rooms={rooms}
              />
            )
          )
        ) : (
          <div className="no-items-container">
            <h1 style={{ color: "red" }}>NO ITEMS YET!</h1>
            <Link to="/">
              {" "}
              <FontAwesomeIcon icon={faArrowLeft} />
              Go back to Home page
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default WishList;
