import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "components/layout/Header";
import Footer from "components/footer/Footer";

const Main = () => {
   return (
      <Fragment>
         <Header />
         <Outlet />
         <Footer />
      </Fragment>
   );
};

export default Main;
