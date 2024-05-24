// For production
// const API = "https://www.stay.atstay.in";

// for local environment
const API = "http://localhost:5001";
const API_1 = `${API}/auth/login`;
const API_2 = `${API}/auth/register`;
const API_3 = `${API}/`;
const API_4 = `${API}/properties/create`;
const API_5 = `${API}/api/Registerhosts`;
const API_6 = `${API}/api/hostLogin`;
const API_7 = `${API}/properties/getall`; // for getting all properties listing
const API_8 = `${API}/properties?category=`; //for getting data using categories
const API_9 = `${API}/properties/`; // for getting particular property using id
const API_10 = `${API}/api/availability/particular-room`;
const API_11 = `${API}/api/hostInfo`;

const API_13 = `${API}/key`;
const API_14 = `${API}/verification`;

const API_15 = `${API}/Order`;
const API_16 = `${API}/key`;
const API_17 = `${API}/verification`;
const API_18 = `${API}/saveDataToDatabase1`;
const API_19 = `${API}/sendInvoiceByEmail`;

const API_20 = `${API}/users/`;
const API_21 = `${API}/properties/search/`;
const API_22 = `${API}/bookings/create`;
const API_23 = `${API}/bookings/getUserBookingData`;
const API_24 = `${API}/properties/getListingsHost`;
const API_25 = `${API}/properties/updateListing`;
const API_26 = `${API}/api/createAvailabilities`;
const API_27 = `${API}/auth/reset`;
const API_28 = `${API}/auth/new-password`;

export {
  API_1,
  API_2,
  API_3,
  API_4,
  API_5,
  API_6,
  API_7,
  API_8,
  API_9,
  API_10,
  API_11,
  API_13,
  API_14,
  API_15,
  API_16,
  API_17,
  API_18,
  API_19,
  API_20,
  API_21,
  API_22,
  API_23,
  API_24,
  API_25,
  API_26,
  API_27,
  API_28,
};
