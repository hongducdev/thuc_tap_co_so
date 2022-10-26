import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "components/layout/Header";

const Main = () => {
   return (
      <Fragment>
         <Header />
         <Outlet />
      </Fragment>
   );
};

export default Main;
