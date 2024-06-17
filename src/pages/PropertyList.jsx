import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

import { API_24, API_3 } from "../api/api";
import axios from "axios";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const [propertyList, setPropertyList] = useState();
  const host = useSelector((state) => state.host);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getPropertyList = async () => {
    try {
      const response = await axios.get(`${API_24}/${host._id}`);

      setPropertyList(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* <Navbar /> */}
      <h1 className="title-list">Your Properties</h1>
      <div className="list">
        {propertyList?.map(
          ({
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
            <div
              className="property-list"
              onClick={(e) => {
                navigate(`/editListing/${hotelId}`);
                e.stopPropagation();
              }}
              key={hotelId}
            >
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
            </div>
          )
        )}
      </div>
    </>
  );
};

export default PropertyList;
