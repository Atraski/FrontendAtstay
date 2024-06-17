import Navbar from "../components/Navbar/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Footer from "../components/Footer";
import LowerNavbar from "../components/LowerNavbar";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_3 } from "../api/api";
import { setShowPopup, setWishList } from "../redux/state";
import LoginPopup from "../components/LoginPopup";
import { setSelectedCategory } from "../redux/state";

const HomePage = () => {
  const user = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const gettingWishlist = async () => {
    try {
      const resp = await axios.get(`${API_3}users/${user._id}/getAllWishlist`);

      dispatch(setWishList(resp.data.wishList));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setShowPopup({ popup: false }));
    dispatch(setSelectedCategory("All"));
  }, []);

  useEffect(() => {
    if (user) {
      gettingWishlist();
    }
  }, []);

  return (
    <>
      <LoginPopup />
      {/* <LowerNavbar /> */}
      <Listings />
      {/* <Slide /> */}
      <Categories />
      <Footer />
    </>
  );
};

export default HomePage;
