import { useParams } from "react-router-dom";
import "../styles/List.scss";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { API_21, API_3 } from "../api/api";
import axios from "axios";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { search, checkIn, checkOut, guest } = useParams();
  const listings = useSelector((state) => state.listings);

  const dispatch = useDispatch();

  const getSearchListings = async () => {
    try {
      const response = await fetch(`${API_21}${search}`, {
        method: "GET",
      });

      const data = await response.json();

      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
    }
  };

  useEffect(() => {
    getSearchListings();
    // tempFunc();
  }, [search, checkIn, checkOut, guest]);

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* <Navbar /> */}
      <h1 className="title-list">{search}</h1>
      <div className="list">
        {listings?.map(
          ({
            _id,
            hostId,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
            hotelId,
            rooms,
          }) => (
            <ListingCard
              listingId={hotelId}
              creator={hostId}
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
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
