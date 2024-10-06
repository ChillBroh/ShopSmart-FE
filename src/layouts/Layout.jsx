import React from "react";
import Navbar from "../components/common/Header";
import Router from "../routes/Router";
import Footer from "../components/common/Footer";
import AdminNavBar from "../components/admin/AdminNavBar";
import VendorNavBar from "../components/vendor/VendorNavBar";
import CSRNavBar from "../components/csr/CSRNavBar";

const Layouts = () => {
  const token = localStorage.getItem("user");
  const payload = JSON.parse(token);
  const role = payload?.role;

  const renderNavBar = () => {
    switch (role) {
      case "Administrator":
        return <AdminNavBar />;
      case "Vendor":
        return <VendorNavBar />;
      case "CSR":
        return <CSRNavBar />;
      default:
        return <Navbar />;
    }
  };

  return (
    <div>
      {renderNavBar()}
      <Router />
      <Footer />
    </div>
  );
};

export default Layouts;
