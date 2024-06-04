import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import HostLogin from "./pages/host/HostLogin";
import HostRegister from "./pages/host/HostRegister";
import Navbar from "./components/Navbar/Navbar";
import BookingPage from "./pages/booking/BookingPage";
import BookingForm from "./pages/booking/BookingForm";
import CartDetailsPage from "./pages/temp/CartDetailsPage";
import Invoice from "./pages/temp/invoice";
import { useState } from "react";
import EditListing from "./pages/EditListing";
import CreateAvailability from "./pages/availability/CreateAvailability";
import EditAvailability from "./pages/availability/EditAvailability";
import PrivacyPolicy from "./pages/PrivacyPolicies";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ScrollRestoration from "./utility/ScrollRestoration";

function App() {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  return (
    <div onClick={() => setDropdownMenu(false)}>
      <BrowserRouter>
        <ScrollRestoration />
        <Navbar dropdownMenu={dropdownMenu} setDropdownMenu={setDropdownMenu} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/hostRegister" element={<HostRegister />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hostLogin" element={<HostLogin />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route
            path="/properties/category/:category"
            element={<CategoryPage />}
          />
          <Route
            path="/properties/search/:search/:checkIn/:checkOut/:guest"
            element={<SearchPage />}
          />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/bookingPage" element={<BookingPage />} />
          <Route path="/bookingForm" element={<BookingForm />} />
          <Route path="/cartDetailsPage" element={<CartDetailsPage />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/editListing/:hotelId" element={<EditListing />} />
          <Route
            path="/create-availability/:hotelId/:type"
            element={<EditAvailability />}
          />
          <Route path="/create-availability" element={<CreateAvailability />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Reset Password */}
          <Route path="/reset/:resetToken" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
