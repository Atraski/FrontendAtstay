import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate, Link } from "react-router-dom";

import { API_24, API_3 } from "../api/api";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PropertyList = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [propertyList, setPropertyList] = useState([]);
  const host = useSelector((state) => state.host);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getPropertyList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_24}/${host._id}`);

      setPropertyList(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const propertyEmpty = propertyList.length === 0;

  useEffect(() => {
    getPropertyList();
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <h1 className="title-list">Your Properties</h1>
      <div className="list">
        {propertyEmpty ? (
          <div className="no-properties-container">
            <h2>NO PROPERTIES YET &#128533;</h2>
            <Link to="create-listing">
              <FontAwesomeIcon icon={faPlus} size="sm" /> Add property
            </Link>
          </div>
        ) : (
          propertyList.map(
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
    </div>
  );
};

export default PropertyList;
