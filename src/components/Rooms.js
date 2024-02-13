// import React, {useState} from 'react';
import { useState } from "react";
import moment from "moment";

import { productData4 } from "./Atstaynextdata";
import { useEffect } from "react";
import { productData } from "./Atstaysdata";
import { productData6 } from "./Atstaynextprice";
import AOS from "aos";
// import 'aos/dist/aos.css';

import { productData1 } from "./Atstaynextdata";
import { facilities } from "./Atstaynextdata";

import carousel1 from "../images/carouselimg1.webp";
import carousel2 from "../images/carouselimg2.webp";
import carousel3 from "../images/carouselimg3.webp";

import Carousel from "react-bootstrap/Carousel";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./room.css";

import Footer from "./Footer.js";
import { useLocation } from "react-router-dom";
import { API_2 } from "../api/api.js";
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

// import React from 'https://cdn.skypack.dev/react@17.0.1';
// import ReactDOM from 'https://cdn.skypack.dev/react-dom@18.2.0';
function Rooms() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const roomValue = new URLSearchParams(location.search).get("roomValue");
  console.log(roomValue, "csc");
  console.log(localStorage.getItem(`valuee0`));

  // const [nextmm , setNextmm] = useState(productData);
  // const mm4mm = next.filter((ds)=> ds.id == params.id)

  const [next, setNext] = useState(productData4);
  const [Increment, setIncrement] = useState(roomValue);
  const [showMoreLines, setShowMoreLines] = useState(false);

  const mm4 = next.filter((ds) => ds.id == params.id);
  console.log(mm4);

  const [pricedata, setPricedata] = useState(productData6);
  const [data, setdata] = useState(productData);
  const [dd1, setdd] = useState(productData1);
  const [faci, setfaci] = useState(facilities);
  const [checkout, setcheckout] = useState(
    () => localStorage.getItem("checkout") || ""
  );
  const [checkin, setcheckin] = useState(
    () => localStorage.getItem("checkin") || ""
  );
  const [numss, setnumss] = useState(() => localStorage.getItem("child"));
  const [nums, setnums] = useState(() => localStorage.getItem("adult"));
  const [num, setnum] = useState(() => localStorage.getItem("room" || 0));
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [r1, setr1] = useState(0);
  const [r2, setr2] = useState(0);
  const [r3, setr3] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [scrolled, setScrolled] = useState(false);

  // Event listener to track scroll position
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    // Adjust the threshold based on when you want the transition to occur
    const scrollThreshold = 100;

    // Update the state based on scroll position
    setScrolled(scrollPosition > scrollThreshold);
  };

  // Attach the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (!isNaN(checkinDate) && !isNaN(checkoutDate)) {
      const timeDifference = checkoutDate - checkinDate;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      setNumberOfDays(daysDifference);

      // Store the number of days in localStorage
      localStorage.setItem("numberOfDays", daysDifference.toString());
    }
  }, [checkin, checkout]);

  // const [num,setnum]=useState(0)
  // const [nums,setnums]=useState(0)
  // const [numss,setnumss]=useState(0)
  const mm1 = data.filter((ds) => ds.id == params.id);
  const mm2 = pricedata.filter((ds) => ds.id == params.id);

  console.log(mm2);
  console.log(dd1);
  console.log("mm2:", mm2);

  const mm3 = faci.filter((ds2) => ds2.id == params.id);

  useEffect(() => {
    localStorage.setItem("productData", JSON.stringify(data));

    localStorage.setItem("productData1", JSON.stringify(dd1));
    localStorage.setItem("facilities", JSON.stringify(faci));
    localStorage.setItem("checkout", checkout);
    localStorage.setItem("checkin", checkin);
    localStorage.setItem("child", numss);
    localStorage.setItem("adult", nums);
    localStorage.setItem("room", num);
    fetchDataFromServer();
  }, [data, dd1, faci, checkout, checkin, numss, nums, num]);

  const fetchDataFromServer = async () => {
    try {
      const response = await fetch(`${API_2}${params.id}`);
      const data = await response.json();
      console.log(data);

      // setUpdatedRooms(data.rooms || 2);
      setr1(data.roomno1 || 2);
      setr2(data.roomno2 || 2);
      setr3(data.roomno3 || 2);

      // setRoomprice(data.roomprice || '');
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  };

  console.log(setr1, "sss");
  console.log(setr2, "lll");
  console.log(setr3, "sssss");

  // const navi = () => {
  //   if (checkin === checkout) {
  //     alert('Please select valid and different check-in and check-out dates.');

  //   } else {
  //     console.log(checkout, checkin, num, nums, numss);
  //     navigate(`/cartpage/${mm4.id}`);
  //     // Navigate to the next page (add your navigation logic here)
  //   }
  // };

  const inc = () => {
    if (num < Increment) {
      const s = parseInt(num + 1);
      setnum(s);
    } else {
      alert("Oops No More Rooms Available");
    }
  };
  const inc1 = () => {
    if (nums < num * 2) {
      setnums(parseInt(nums + 1));
    } else {
      alert("No More Adults Are Allowed");
    }
  };
  const inc2 = () => {
    if (numss >= num) {
      setnumss(parseInt(numss) + 1);
    }
  };
  const dec = () => {
    if (num > 0) {
      setnum(num - 1);
    } else {
    }
  };
  const dec1 = () => {
    if (nums > 0) {
      setnums(nums - 1);
    } else {
    }
  };
  const dec2 = () => {
    if (numss > 0) {
      setnumss(numss - 1);
    } else {
    }
  };

  const showbox = () => {
    if (checkin === checkout) {
      alert("Please select valid and different check-in and check-out dates.");
      return 1;
    }

    const box = document.querySelector(".hide");
    const classss = document.querySelector(".nonflex");
    box.style.setProperty("display", "block", "important");
    classss.classList.remove("container");
    classss.classList.add("container-fluid");
  };

  const closebox = () => {
    const box = document.querySelector(".hide");
    box.style.setProperty("display", "none", "important");
    const classss = document.querySelector(".nonflex");

    classss.classList.add("container");
    classss.classList.remove("container-fluid");
  };
  // galleryy code

  const MyApp = () => {
    // const [stateVariable, setStateVariable] = useState(initialValue);

    // const images = [
    //   {
    //     url:
    //       'https://images.unsplash.com/photo-1611656752661-d66725c3bc0c?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjIzNzEyMjk&ixlib=rb-1.2.1&q=80',
    //   },
    //   {
    //     url:
    //       'https://images.unsplash.com/photo-1622398703904-7ae5d55f8e1a?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjIzNzEzMjk&ixlib=rb-1.2.1&q=80',
    //   },
    //   {
    //     url:
    //       'https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjIzODUwOTg&ixlib=rb-1.2.1&q=80',
    //   },
    //   {
    //     url:
    //       'https://images.unsplash.com/photo-1580274455191-1c62238fa333?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjIzODUxNzM&ixlib=rb-1.2.1&q=80',
    //   },
    // ];
    const [selectedImg, setSelectedImg] = useState(productData4);
    const [next, setNext] = useState(productData4);
    const mm4 = next.filter((ds) => ds.id == params.id);
    useEffect(() => {
      // Set the default image to the first image in the mm4 array
      if (mm4.length > 0 && mm4[0].images.length > 0) {
        setSelectedImg(mm4[0].images[0].image1);
      }
    }, []);

    return (
      <div className="flex-row-wrapper">
        <SelectedImages selectedImg={selectedImg} />
        <Images
          images={selectedImg}
          selectImg={selectedImg}
          setSelectedImages={setSelectedImg}
        />
      </div>
    );
  };

  const SelectedImages = (props) => {
    const { selectedImg } = props;
    return (
      <div className="flex">
        <img className="img" src={selectedImg} alt="img" />
      </div>
    );
  };

  const Images = (props) => {
    const { images, setSelectedImages } = props;
    const [next, setNext] = useState(productData4);
    const mm4 = next.filter((ds) => ds.id == params.id);

    const handleImageClick = (selectedImg) => {
      setSelectedImages(selectedImg);
    };

    return (
      <div className="flexs" id="short-img">
        {mm4.map((data, index) =>
          data.images.map((mmcs, i) => (
            <img
              key={index}
              src={mmcs.image1}
              alt="images"
              className="mini-img"
              onClick={() => handleImageClick(mmcs.image1)}
            />
          ))
        )}
      </div>
    );
  };
  const currentDate = moment().format("YYYY-MM-DD");

  return (
    <>
      <div className="container m222">
        <div
          className="container "
          data-aos="zoom-in"
          style={{ transitionDelay: "0.3s", transitionDuration: "1.3s" }}
        >
          {/* Your existing divs with the flex class */}
          <div className="flex ">
            {/* Content of the first div */}
            <MyApp />
          </div>
        </div>

        <h2 className="ps-4 colorss">Traditional Huts</h2>

        {mm4.map((nextm) => {
          return (
            <>
              <div>
                {/* <Carousel styel={{maxwidth:"100%"}}>
            {
              nextm.images.map((ele , i)=>{
                return(
                  
      <Carousel.Item style={{ width:'100%', height:'100%'}} className="mcm">
        <img src={ele.image1} style={{ width:'100%' , height:'700px'}} className="mccm"/>
        <Carousel.Caption  >
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
                )
              })
            }
      {/* <Carousel.Item>
      <img src={carousel2}  style={{ width:'100%' ,  height:'600px'}} />        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={ carousel3}  style={{ width:'100%' ,  height:'600px'}}  />
              <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}

                {/* </Carousel> */}
              </div>
              <div
                className="container nonflex"
                id="outerdiv"
                style={{ height: "auto", display: "flex" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                  }}
                >
                  <div className="mt-0" style={{ padding: "" }}>
                    <hr style={{ width: "100%" }}></hr>
                  </div>
                  <div
                    className={`your-element-class ${
                      scrolled ? "scrolled" : ""
                    }`}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "95%",
                    }}
                  >
                    {/* <div  className='p-4'style={{display:"flex"}}>
                    <i class="fa-solid fa-bed-pulse mt-1"></i>
                      <p>Beds:1</p>
                            </div> */}
                    <div
                      className="p-4 pt-0 pb-0"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div style={{ display: "flex" }}>
                        <i
                          style={{ color: "#000000a6" }}
                          class="fa-solid fa-bed-pulse mt-1 me-3"
                        ></i>
                        <p className="colorss">Beds:1</p>
                      </div>

                      <p style={{ fontSize: "15px", color: "#877f7f" }}>
                        Only One Bed Is Available
                      </p>
                    </div>
                    <div
                      className="p-4 pt-0 pb-0"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div style={{ display: "flex" }}>
                        <i
                          style={{ color: "#000000a6" }}
                          class="fa-solid fa-children mt-1 me-3 "
                        ></i>
                        <p className="colorss">Adults:2</p>
                      </div>
                      <p style={{ fontSize: "15px", color: "#877f7f" }}>
                        Only Two Adults Is Allowed
                      </p>
                    </div>
                    <div
                      className="p-4 pt-0 pb-0"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div style={{ display: "flex" }}>
                        <i
                          style={{ color: "#000000a6" }}
                          class="fa-solid fa-child mt-1 me-3"
                        ></i>
                        <p className="colorss">Children:1</p>
                      </div>
                      <p style={{ fontSize: "15px", color: "#877f7f" }}>
                        Only One Children Is Allowed
                      </p>
                    </div>
                  </div>
                  <hr className="ms-4" style={{ width: "95%" }}></hr>
                  <div
                    className={`your-element-class ${
                      scrolled ? "scrolled" : ""
                    }`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="ps-4 pb-4"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <h4 className="colorss">Room facilities</h4>
                    </div>
                    <div
                      className="facility"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "88%",
                      }}
                    >
                      <div
                        className="ps-4 pb-4 pb-0"
                        style={{ display: "flex" }}
                      >
                        <i
                          style={{ color: "#000000a6" }}
                          class="fa-solid fa-wifi me-3 fs-5"
                        ></i>
                        <p className="colorss"> Free wfi</p>
                      </div>
                      <div
                        className="ps-4 pb-4 pb-0"
                        style={{ display: "flex" }}
                      >
                        <i
                          style={{ color: "#000000a6" }}
                          class="fa-solid fa-fan me-3 fs-5"
                        ></i>
                        <p className="colorss">Air Conditioning</p>
                      </div>
                      <div
                        className="ps-4 pb-2 pb-0"
                        style={{ display: "flex" }}
                      >
                        <i
                          style={{ color: "#000000a6" }}
                          class="fa-solid fa-car me-3 fs-5"
                        ></i>
                        <p className="colorss">Parking</p>
                      </div>
                    </div>
                    <hr className="ms-4" style={{ width: "95%" }}></hr>
                  </div>
                  <div
                    className={`your-element-class ${
                      scrolled ? "scrolled" : ""
                    } MMM ps-4 pe-4`}
                  >
                    <h4 className="colorss">
                      Points Must Know About The Place
                    </h4>

                    <div>
                      <p className="pt-3" style={{ textAlign: "justify" }}>
                        Himachal Pradesh is a northern Indian state in the
                        Himalayas. It's home to scenic mountain towns and
                        resorts such as Dalhousie. Host to the Dalai Lama,
                        Himachal Pradesh has a strong Tibetan presence. This is
                        reflected in its Buddhist temples and monasteries, as
                        well as its vibrant Tibetan New Year celebrations. The
                        region is also well known for its trekking, climbing and
                        skiing areas.
                      </p>
                    </div>
                    {/* <button className='bg-primary btn-sm' onClick={() => setShowMoreLines(!showMoreLines)}>Show More</button> */}
                    <div className="divv" style={{}}>
                      <p className="btn-sm modelbtn" onClick={openModal}>
                        show More
                      </p>
                      &nbsp;&nbsp;<span>></span>
                    </div>
                  </div>

                  {/* 3D Modal */}
                  {isModalOpen && (
                    <div className="modal-3d-overlay">
                      <div className="modal-3d-content">
                        {/* Your modal content goes here */}
                        {/* <h2>3D Modal Content</h2> */}
                        <p>
                          Himachal Pradesh is a northern Indian state in the
                          Himalayas. It's home to scenic mountain towns and
                          resorts such as Dalhousie. Host to the Dalai Lama,
                          Himachal Pradesh has a strong Tibetan presence. This
                          is reflected in its Buddhist temples and monasteries,
                          as well as its vibrant Tibetan New Year celebrations.
                          The region is also well known for its trekking,
                          climbing and skiing areas.
                        </p>
                        <button className="closebtn" onClick={closeModal}>
                          Close Modal
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white hide" style={{ width: "350px" }}>
                  <div
                    className=" my-5"
                    style={{ height: "470px", backgroundColor: "#66cccc" }}
                  >
                    <i
                      class="fa-solid fa-xmark"
                      onClick={closebox}
                      style={{
                        float: "right",
                        display: "none",
                        cursor: "pointer",
                      }}
                    ></i>

                    {/* {mm2.map((rm, rmid) => (
  <div key={rmid}>
    {rm.room1.map((rum, i) => (
      <div style={{ backgroundColor: "#66cccc", height: "70px", display: "flex", justifyContent: "center", alignItems: 'center', border: "0.1px solid #66cccc" }}>
        <h5>{rum.price} from ₹/night</h5>
      </div>
    ))}
  </div>
))} */}
                    {mm2.map((rm, rid) => {
                      return (
                        <div>
                          <div
                            style={{
                              backgroundColor: "#66cccc",
                              height: "70px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "0.1px solid #66cccc",
                            }}
                          >
                            {" "}
                            <h5>{rm.price} from ₹/night</h5>
                          </div>
                        </div>
                      );
                    })}

                    {/* {
  mm2.map((rm)=>{
    return(
      <div>
              <div style={{ backgroundColor: "#66cccc", height: "70px", display: "flex", justifyContent: "center", alignItems: 'center', border: "0.1px solid #66cccc"}}> <h5>{rm.price} from ₹/night</h5></div>

        </div>
    )
  })
} */}
                    <div
                      style={{
                        backgroundColor: "#fff",
                        height: "70px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "0.1px solid #66cccc",
                      }}
                    >
                      <h4>Book</h4>
                    </div>

                    <div style={{ height: "150px", display: "flex" }}>
                      <div
                        style={{
                          backgroundColor: "white",
                          height: "100%",
                          width: "50%",
                          border: "0.1px solid #66cccc",
                        }}
                      >
                        <p className="mt-4 ms-2">Check In</p>
                        <input
                          type="date"
                          placeholder="asdf"
                          value={checkin}
                          min={currentDate}
                          onChange={(e) => {
                            setcheckin(e.target.value);
                          }}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "none",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          backgroundColor: "white",
                          height: "100%",
                          width: "50%",
                          border: "0.1px solid #66cccc",
                        }}
                      >
                        <p className="mt-4 ms-2">Check Out</p>
                        <input
                          type="date"
                          placeholder="asdf"
                          value={checkout}
                          min={checkin || currentDate}
                          onChange={(e) => {
                            setcheckout(e.target.value);
                          }}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "none",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="p-5"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "125px",
                        borderTop: "1px solid #66cccc",
                      }}
                    >
                      <p style={{ fontWeight: "600" }}>Check In-Out</p>
                      <div
                        style={{
                          cursor: "pointer",
                          fontWeight: "600",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {" "}
                        <span style={{ width: "70px" }}> Room</span>{" "}
                        <span style={{ width: "" }} onClick={() => dec()}>
                          -
                        </span>
                        <span>{num}</span>
                        <span onClick={() => inc()}>+</span>
                      </div>
                      <div
                        style={{
                          cursor: "pointer",
                          fontWeight: "600",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {" "}
                        <span style={{ width: "70px" }}> Adult</span>{" "}
                        <span style={{ width: "" }} onClick={() => dec1()}>
                          -
                        </span>
                        <span>{nums}</span>
                        <span onClick={() => inc1()}>+</span>
                      </div>
                      <div
                        style={{
                          cursor: "pointer",
                          fontWeight: "600",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ width: "70px" }}> Children</span>{" "}
                        <span
                          style={{ width: "" }}
                          onClick={() => dec2()}
                          className=""
                        >
                          -
                        </span>
                        <span className="">{numss}</span>
                        <span className="" onClick={() => inc2()}>
                          +
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "white",
                        height: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "0.1px solid #66cccc",
                      }}
                    >
                      <button
                        className=""
                        style={{
                          backgroundColor: "#66cccc",
                          textTransform: "uppercase",
                          border: "none",
                          borderRadius: "25px",
                          padding: "5px 15px",
                        }}
                      >
                        <h2
                          style={{ fontSize: "20px", marginTop: "5px" }}
                          onClick={() => {
                            if (checkin === checkout || !checkin || !checkout) {
                              alert(
                                "Please select valid and different check-in and check-out dates."
                              );
                            }

                            if (nums == 0) {
                              alert("Please Select the Adults");
                              return -1;
                            }

                            if (!checkin || !checkout) {
                              alert("Add Your Checkin Checkout date");
                              return;
                            }
                            console.log(checkout, checkin, num, nums, numss);
                            navigate(`/cartpage/${nextm.id}`);
                            // Navigate to the next page (add your navigation logic here)
                          }}
                        >
                          BOOK Now
                        </h2>
                      </button>
                    </div>
                  </div>
                  <div
                    className="mt-5 p-4 fs-5"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #66cccc",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div>
                        <i
                          style={{ color: "#66cccc", fontWeight: "600" }}
                          class="fa-solid fa-envelope mt-1 me-2"
                        ></i>
                      </div>
                      <div style={{ fontWeight: "700" }}>
                        {" "}
                        Atraski@Gmail.com
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <div>
                        <i
                          style={{ color: "#66cccc", fontWeight: "600" }}
                          class="fa-solid fa-phone mt-1 me-5"
                        ></i>
                      </div>
                      <div style={{ fontWeight: "700" }} className="me-3">
                        8898734567
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <Footer></Footer>

      <div
        className="whitebox w-100 bg-white d-none container1"
        style={{
          height: "80px",
          justifyContent: "around",
          alignItems: "center",
          zIndex: 20,
          position: "fixed",
          bottom: "0%",
        }}
      >
        <div className="pricesss">
          {mm1.map((ele) => {
            return (
              <>
                <p
                  style={{ fontSize: "25px" }}
                  className="mx-5"
                  style={{
                    fontSize: "19px",
                    marginRight: "3rem",
                    marginLeft: "2rem",
                  }}
                >
                  from ₹,{ele.price}
                </p>
              </>
            );
          })}
        </div>
        <div className="booking">
          <button
            className="btn btn-primary mx-5"
            style={{ width: "200px" }}
            onClick={showbox}
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}
export default Rooms;
