import React, { useEffect, useState } from "react";
import Router from "../routes/Router";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AdminNavbar from "../components/admin/AdminNavBar";

const Layouts = () => {
  //   const token = localStorage.getItem("jsonwebtoken");
  //   const payload = JSON.parse(token);
  //   const role = payload?.decodedJWT.userRole;

  return (
    <div>
      {/* {role === "admin" ? (
        <>
          <Header />
          <Router />
          <Footer />
        </>
      ) : role === "instructor" ? (
        <>
          <Header />
          <Router />
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <Router />
          <Footer />
        </>
      )} */}
      <AdminNavbar />
      <Router />
    </div>
  );
};

export default Layouts;
