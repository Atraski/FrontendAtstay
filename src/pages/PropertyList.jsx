import "../styles/List.scss";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { Fragment, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate, Link } from "react-router-dom";

import { API_24 } from "../api/api";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PropertyList = () => {
  const [loading, setLoading] = useState(false);
  const [verifiedPropertyList, setVerifiedPropertyList] = useState([]);
  const [notVerifiedPropertyList, setNotVerifiedPropertyList] = useState([]);

  const host = useSelector((state) => state.host);

  const navigate = useNavigate();

  const getPropertyList = async () => {
    let verifiedProperties = [];
    let notVerifiedProperties = [];
    try {
      setLoading(true);
      const response = await axios.get(`${API_24}/${host._id}`);

      const allProperties = response.data;

      allProperties.forEach((property, index) => {
        if (property.verification) {
          verifiedProperties.push(property);
        } else {
          notVerifiedProperties.push(property);
        }
      });

      setVerifiedPropertyList(verifiedProperties);
      setNotVerifiedPropertyList(notVerifiedProperties);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const verifiedPropertyListIsEmpty = verifiedPropertyList.length === 0;
  const notVerifiedPropertyListIsEmpty = notVerifiedPropertyList.length === 0;

  useEffect(() => {
    getPropertyList();
  }, []);

  return (
    <Fragment>
      <div>
        <h1 className="title-list">Your Properties</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="list">
            {verifiedPropertyListIsEmpty ? (
              <div className="no-properties-container">
                <h2>NO PROPERTIES YET &#128533;</h2>
                <Link to="create-listing">
                  <FontAwesomeIcon icon={faPlus} size="sm" /> Add property
                </Link>
              </div>
            ) : (
              verifiedPropertyList.map(
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
              )
            )}
          </div>
        )}
      </div>

      {/* Not Verified properties */}
      {!notVerifiedPropertyListIsEmpty && (
        <div className="not-verified-container">
          <h1 className="title-list">Pending Verification</h1>
          <div className="list">
            {notVerifiedPropertyList.map(
              (
                {
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
                },
                index
              ) => (
                <div
                  className="property-list"
                  onClick={(e) => {
                    navigate(`/editListing/${hotelId}`);
                    e.stopPropagation();
                  }}
                  key={index}
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
        </div>
      )}
    </Fragment>
  );
};

export default PropertyList;
