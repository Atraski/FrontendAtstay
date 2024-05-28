import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  user: null,
  token: null,
  host: null,
  bookingData: null,
  tempHost: null,
  showPopup: false,
  imagePopup: false,
  listings: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setHostLogout: (state) => {
      state.host = null;
      state.token = null;
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setTripList: (state, action) => {
      state.user.tripList = action.payload;
    },
    setWishList: (state, action) => {
      state.user.wishList = action.payload;
    },
    setPropertyList: (state, action) => {
      state.user.propertyList = action.payload;
    },
    setReservationList: (state, action) => {
      state.user.reservationList = action.payload;
    },
    setHostLogin: (state, action) => {
      state.host = action.payload.host;
    },
    setHostData: (state, action) => {
      state.host = action.payload.host;
    },
    setTempHostData: (state, action) => {
      state.tempHost = action.payload.tempHost;
    },
    setBookingData: (state, action) => {
      state.bookingData = action.payload.bookingData;
    },
    setShowPopup: (state, action) => {
      state.showPopup = action.payload.popup;
    },
    setImagePopup: (state, action) => {
      state.imagePopup = action.payload.show;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setListings,
  setTripList,
  setWishList,
  setPropertyList,
  setReservationList,
  setHostLogin,
  setHostLogout,
  setHostData,
  setBookingData,
  setTempHostData,
  setShowPopup,
  setImagePopup,
} = userSlice.actions;
export default userSlice.reducer;
