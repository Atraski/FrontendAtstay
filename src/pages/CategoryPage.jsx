import { useState, useEffect } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { API_3 } from "../api/api";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(`${API_3}properties?category=${category}`, {
        method: "GET",
      });

      const data = await response.json();
      dispatch(setListings({ listings: data }));

      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* <Navbar /> */}
      <h1 className="title-list">{category} listings</h1>
      <div className="list">
        {listings.length > 0 ? (
          listings?.map(
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
              connect with us: <br></br> Phone No.: 8077412283 <br></br> Email:
              atstaytravel@gmail.com
            </h4>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
