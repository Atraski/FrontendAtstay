import { useEffect, useState } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import { API_3, API_7 } from "../api/api";
import LowerNavbar from "./LowerNavbar";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);
  console.log(listings);

  const getFeedListings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `${API_3}properties?category=${selectedCategory}`
          : API_7,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log("listingData", data);
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);
  // console.log("stored listing", listings);

  return (
    <>
      {/* <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${
              category.label === selectedCategory ? "selected" : ""
            }`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div> */}
      <LowerNavbar setSelectedCategory={setSelectedCategory} />

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.length > 0 ? (
            listings.map(
              ({
                _id,
                hotelId,
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
                rooms,
              }) => (
                <ListingCard
                  key={_id}
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
            )
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h2>Coming Soon..........</h2>
              <h4>
                connect with us: <br></br> Phone No.: 8077412283 <br></br>{" "}
                Email: atstaytravel@gmail.com
              </h4>
            </div>
          )}
        </div>
      )}
      {/* <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${
              category.label === selectedCategory ? "selected" : ""
            }`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default Listings;
