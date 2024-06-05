import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import axios from "axios";
import { API_24 } from "../../api/api";
import { Link } from "react-router-dom";
import ListingCard from "../../components/ListingCard";
import "../../styles/List.scss";

const CreateAvailability = () => {
  const host = useSelector((state) => state.host);
  const [propertyList, setPropertyList] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const getPropertyList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_24}/${host._id}`);
      console.log("response: ", response.data);
      setPropertyList(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPropertyList();
  }, []);

  useEffect(() => {
    console.log("Host: ", host);
    if (!host) {
      navigate("/hostlogin");
    }
  }, [host, navigate]);
  useEffect(() => {
    console.log("property list", propertyList);
  }, [propertyList]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 className="title-list">Create Availability</h1>
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
            <Link to={`/create-availability/${hotelId}/${type}`}>
              <div onClick={(e) => e.stopPropagation()}>
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
            </Link>
          )
        )}
      </div>
    </>
  );
};

export default CreateAvailability;
