import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar/Navbar";
import { categories, types, facilities } from "../data";

import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { API_25, API_4, API_9, API_3 } from "../api/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const EditListing = () => {
  const [listing, setListing] = useState();
  const [category, setCategory] = useState();
  const [type, setType] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    // aptSuite: "",
    city: "",
    province: "",
    country: "",
  });
  /* BASIC COUNTS */
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  // selecting room types
  const [standardRoom, setStandardRoom] = useState(0);
  const [doubleRoom, setDoubleRoom] = useState(0);
  const [deluxeRoom, setDeluxeRoom] = useState(0);
  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);
  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const { hotelId } = useParams();

  const listingId = hotelId;

  const getListing = async () => {
    try {
      const resp = await axios.get(`${API_9}${listingId}`);

      setListing(resp.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (listing) {
      setCategory(listing.category);
      setType(listing.type);
      setFormLocation({
        streetAddress: listing.streetAddress,
        city: listing.city,
        province: listing.province,
        country: listing.country,
      });
      setPincode(listing.pincode);
      setAmenities(listing.amenities);
      setFormDescription({
        title: listing.title,
        description: listing.description,
        highlight: listing.highlight,
        highlightDesc: listing.highlightDesc,
        price: listing.price,
      });
      setStandardRoom(listing.rooms[0]?.price || 0);
      setDoubleRoom(listing.rooms[1]?.price || 0);
      setDeluxeRoom(listing.rooms[2]?.price || 0);
    }
  }, [listing]);
  useEffect(() => {
    getListing();
  }, []);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setPincode(inputValue);

    // Check for minimum and maximum length constraints
    if (inputValue.length !== 6) {
      setError("Pincode must be 6 digits long.");
    } else {
      setError("");
    }
  };

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  // const handleChange = (index, event) => {
  //   const { name, value } = event.target;
  //   setRoomTypes((prevRooms) => {
  //     const updatedRooms = [...prevRooms];
  //     updatedRooms[index][name] = value;
  //     return updatedRooms;
  //   });
  // };

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const creatorId = useSelector((state) => state.host._id);

  const navigate = useNavigate();

  // const handlePost = async (e) => {
  //   e.preventDefault();

  //   try {
  //     /* Create a new FormData onject to handle file uploads */
  //     const listingForm = new FormData();
  //     listingForm.append("hostId", creatorId);
  //     listingForm.append("category", category);
  //     listingForm.append("type", type);
  //     listingForm.append("streetAddress", formLocation.streetAddress);
  //     // listingForm.append("aptSuite", formLocation.aptSuite);
  //     listingForm.append("city", formLocation.city);
  //     listingForm.append("province", formLocation.province);
  //     listingForm.append("country", formLocation.country);
  //     // listingForm.append("guestCount", guestCount);
  //     // listingForm.append("bedroomCount", bedroomCount);
  //     // listingForm.append("bedCount", bedCount);
  //     // listingForm.append("bathroomCount", bathroomCount);
  //     listingForm.append("amenities", amenities);
  //     // listingForm.append("rooms", roomTypes);
  //     listingForm.append("title", formDescription.title);
  //     listingForm.append("description", formDescription.description);
  //     listingForm.append("highlight", formDescription.highlight);
  //     listingForm.append("highlightDesc", formDescription.highlightDesc);
  //     listingForm.append("price", formDescription.price);

  //     /* Append each selected photos to the FormData object */
  //     photos.forEach((photo) => {
  //       listingForm.append("listingPhotos", photo);
  //     });
  //     console.log("formLocation", formLocation);
  //     console.log("listingForm", listingForm);
  //     /* Send a POST request to server */
  //     const response = await fetch(API_4, {
  //       method: "POST",
  //       body: listingForm,
  //     });

  //     if (response.ok) {
  //       navigate("/");
  //     }
  //   } catch (err) {
  //     console.log("Publish Listing failed", err.message);
  //   }
  // };

  // temporary function for testing frontend side
  const tempFunc = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    try {
      if (pincode.length === 6) {
        const listingForm = new FormData();
        listingForm.append("hostId", creatorId);
        listingForm.append("category", category);
        listingForm.append("type", type);
        listingForm.append("streetAddress", formLocation.streetAddress);
        listingForm.append("city", formLocation.city);
        listingForm.append("province", formLocation.province);
        listingForm.append("country", formLocation.country);
        listingForm.append("amenities", amenities);
        listingForm.append("title", formDescription.title);
        listingForm.append("description", formDescription.description);
        listingForm.append("highlight", formDescription.highlight);
        listingForm.append("highlightDesc", formDescription.highlightDesc);
        // listingForm.append("rooms", roomTypes);
        listingForm.append("price", formDescription.price);
        listingForm.append("guestCount", guestCount);
        listingForm.append("bedroomCount", bedroomCount);
        listingForm.append("bedCount", bedCount);
        listingForm.append("bathroomCount", bathroomCount);
        listingForm.append("singleRoom", standardRoom || 0);
        listingForm.append("doubleRoom", doubleRoom || 0);
        listingForm.append("deluxeRoom", deluxeRoom || 0);
        listingForm.append("pincode", pincode);
        // photos.forEach((photo) => {
        //   listingForm.append("listingPhotos", photo);
        // });

        // for (const [key, value] of listingForm.entries()) {
        //   console.log(key + ": " + value);
        // }
        // console.log("rooms", roomTypes);

        // const response = await fetch(API_4, {
        //   method: "POST",
        //   body: listingForm,
        // });
        const data = {
          hostId: creatorId,
          category,
          type,
          streetAddress: formLocation.streetAddress,
          city: formLocation.city,
          province: formLocation.province,
          country: formLocation.country,
          amenities,
          title: formDescription.title,
          description: formDescription.description,
          highlight: formDescription.highlight,
          highlightDesc: formDescription.highlightDesc,
          hotelId,
          pincode,
          price: formDescription.price,
          standardRoom,
          doubleRoom,
          deluxeRoom,
        };
        setIsLoading(true);
        const response = await axios.patch(`${API_25}`, data);
        setIsLoading(false);

        console.log(response);
        if (response.status === 200) {
          // Handle success
          navigate("/");
        }
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const alert = window.confirm(
      "Are you sure you want to delete this property"
    );
    if (alert) {
      try {
        const response = await axios.delete(`${API_3}properties/${listingId}`);
        window.alert(response.data.msg);
        navigate("/");
      } catch (error) {
        console.log("Error Occured", error);
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="create-listing">
          <h1>Publish Your Place</h1>
          <form
            // onSubmit={handlePost}
            onSubmit={tempFunc}
          >
            <div className="create-listing_step1">
              <h2>Step 1: Tell us about your place</h2>
              <hr />
              <h3>Which of these categories best describes your place?</h3>
              <div className="category-list">
                {categories?.map((item, index) => (
                  <div
                    className={`category ${
                      category === item.label ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => setCategory(item.label)}
                  >
                    <div className="category_icon">{item.icon}</div>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>

              <h3>What type of place will guests have?</h3>
              <div className="type-list">
                {types?.map((item, index) => (
                  <div
                    className={`type ${type === item.name ? "selected" : ""}`}
                    key={index}
                    onClick={() => setType(item.name)}
                  >
                    <div className="type_text">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div className="type_icon">{item.icon}</div>
                  </div>
                ))}
              </div>

              <h3>Where's your place located?</h3>
              <div className="full">
                <div className="location">
                  <p>Street Address</p>
                  <input
                    type="text"
                    placeholder="Street Address"
                    name="streetAddress"
                    value={formLocation.streetAddress}
                    onChange={handleChangeLocation}
                    required
                  />
                </div>
              </div>

              <div className="half">
                {/* <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div> */}
                <div className="location">
                  <p>City</p>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formLocation.city}
                    onChange={handleChangeLocation}
                    required
                  />
                </div>
              </div>

              <div className="half">
                <div className="location">
                  <p>Province</p>
                  <input
                    type="text"
                    placeholder="Province"
                    name="province"
                    value={formLocation.province}
                    onChange={handleChangeLocation}
                    required
                  />
                </div>
                <div className="location">
                  <p>Pincode</p>
                  <input
                    type="number"
                    placeholder="pincode"
                    name="pincode"
                    value={pincode}
                    onChange={handleChange}
                    required
                  />
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <div className="location">
                  <p>Country</p>
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={formLocation.country}
                    onChange={handleChangeLocation}
                    required
                  />
                </div>
              </div>

              <h3 style={{ display: type === "Rooms" ? "none" : "" }}>
                Share some basics about your place
              </h3>
              <div
                className="basics"
                style={{ display: type === "Rooms" ? "none" : "" }}
              >
                <div className="basic">
                  <p>Guests</p>
                  <div className="basic_count">
                    <RemoveCircleOutline
                      onClick={() => {
                        guestCount > 1 &&
                          setGuestCount(parseInt(guestCount) - 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />

                    <input
                      type="number"
                      value={guestCount}
                      width={5}
                      onChange={(e) => setGuestCount(e.target.value)}
                    />
                    {/* <p>{guestCount}</p> */}
                    <AddCircleOutline
                      onClick={() => {
                        setGuestCount(parseInt(guestCount) + 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />
                  </div>
                </div>

                <div className="basic">
                  <p>Bedrooms</p>
                  <div className="basic_count">
                    <RemoveCircleOutline
                      onClick={() => {
                        bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />
                    <p>{bedroomCount}</p>
                    <AddCircleOutline
                      onClick={() => {
                        setBedroomCount(bedroomCount + 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />
                  </div>
                </div>

                <div className="basic">
                  <p>Beds</p>
                  <div className="basic_count">
                    <RemoveCircleOutline
                      onClick={() => {
                        bedCount > 1 && setBedCount(bedCount - 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />
                    <p>{bedCount}</p>
                    <AddCircleOutline
                      onClick={() => {
                        setBedCount(bedCount + 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />
                  </div>
                </div>

                <div className="basic">
                  <p>Bathrooms</p>
                  <div className="basic_count">
                    <RemoveCircleOutline
                      onClick={() => {
                        bathroomCount > 1 &&
                          setBathroomCount(bathroomCount - 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />
                    <p>{bathroomCount}</p>
                    <AddCircleOutline
                      onClick={() => {
                        setBathroomCount(bathroomCount + 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="create-listing_step2">
              <h2>Step 2: Make your place stand out</h2>
              <hr />

              <h3>Tell guests what your place has to offer</h3>
              <div className="amenities">
                {facilities?.map((item, index) => (
                  <div
                    className={`facility ${
                      amenities.includes(item.name) ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => handleSelectAmenities(item.name)}
                  >
                    <div className="facility_icon">{item.icon}</div>
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>

              {/* <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext> */}

              <h3>What make your place attractive and exciting?</h3>
              <div className="description">
                <p>Property Name</p>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={formDescription.title}
                  onChange={handleChangeDescription}
                  required
                />
                <p>Property Description</p>
                <textarea
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={formDescription.description}
                  onChange={handleChangeDescription}
                  required
                  style={{ resize: "none" }}
                />
                <p>What is Special about your Property?</p>
                <input
                  type="text"
                  placeholder="Highlight"
                  name="highlight"
                  value={formDescription.highlight}
                  onChange={handleChangeDescription}
                  required
                />
                <p>Few details about your speciality</p>
                <textarea
                  type="text"
                  placeholder="Highlight details"
                  name="highlightDesc"
                  value={formDescription.highlightDesc}
                  onChange={handleChangeDescription}
                  required
                  style={{ resize: "none" }}
                />

                <div>
                  <div
                    className="roomPrices"
                    style={{
                      display: type === "An entire place" ? "none" : "flex",
                    }}
                  >
                    <p>Select Rooms with Price</p>
                    <div className="room-price-container">
                      <div className="rooms">
                        <label htmlFor="standard">Standard</label>
                        <input
                          type="number"
                          placeholder="Enter per night price"
                          name="price"
                          className="price"
                          id="standard"
                          value={standardRoom}
                          onChange={(e) => setStandardRoom(e.target.value)}
                        />
                      </div>
                      <div className="rooms">
                        <label htmlFor="double">Double</label>
                        <input
                          type="number"
                          placeholder="Enter per night price"
                          name="price"
                          className="price"
                          id="double"
                          value={doubleRoom}
                          onChange={(e) => setDoubleRoom(e.target.value)}
                        />
                      </div>
                      <div className="rooms">
                        <label htmlFor="deluxe">Deluxe</label>
                        <input
                          type="number"
                          placeholder="Enter per night price"
                          name="price"
                          className="price"
                          id="deluxe"
                          value={deluxeRoom}
                          onChange={(e) => setDeluxeRoom(e.target.value)}
                        />
                      </div>
                    </div>
                    {/*  {roomTypes.map((room, index) => (
                    <div className="rooms" key={index}>
                      <label htmlFor={room.roomType}>{room.roomType}</label>
                      <input
                        type="number"
                        placeholder="Enter per night price"
                        name="price"
                        className="price"
                        id={room.roomType}
                        value={room.price}
                        onChange={(e) => handleChange(index, e)}
                      />
                       <button type="button" onClick={() => handleAdd()}>
                        Add
                      </button> 

                      {roomTypes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                      ))} */}
                  </div>
                  <div
                    className="entirePlace"
                    style={{ display: type === "Rooms" ? "none" : "" }}
                  >
                    <p>Enter Price</p>
                    <span>Rs.</span>
                    <input
                      type="number"
                      placeholder="100"
                      name="price"
                      value={formDescription.price}
                      onChange={handleChangeDescription}
                      className="price"
                      required
                      // width="125px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="button-container"
              style={{ display: "flex", gap: "10px" }}
            >
              <button
                className="submit_btn"
                style={{ background: "#66cccc" }}
                type="submit"
              >
                UPDATE YOUR LISTING
              </button>
              <button className="submit_btn" onClick={() => handleDelete()}>
                DELETE YOUR LISTING
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditListing;
