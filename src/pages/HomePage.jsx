import Navbar from "../components/Navbar/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Footer from "../components/Footer";
import LowerNavbar from "../components/LowerNavbar";
import { useDispatch, useSelector } from "react-redux";

import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { API_3 } from "../api/api";
import { setShowPopup, setWishList } from "../redux/state";
import LoginPopup from "../components/LoginPopup";
import { setSelectedCategory } from "../redux/state";
import PropertyList from "./PropertyList";

const HomePage = () => {
  const user = useSelector((state) => state?.user);
  const host = useSelector((state) => state?.host);

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

      {!host ? (
        <Fragment>
          <Listings />
          <Categories />
        </Fragment>
      ) : (
        <PropertyList />
      )}
    </>
  );
};

export default HomePage;
