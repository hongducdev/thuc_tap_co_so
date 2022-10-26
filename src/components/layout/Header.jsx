import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
   return (
      <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
         <NavLink
            to="/"
            className={({ isActive }) =>
               isActive
                  ? "text-primary relative after:absolute after:w-1 after:h-1 after:rounded-full after:bg-primary after:-bottom-1 after:left-[50%]"
                  : ""
            }>
            Home
         </NavLink>
         <NavLink
            to="/movies"
            className={({ isActive }) =>
               isActive
                  ? "text-primary relative after:absolute after:w-1 after:h-1 after:rounded-full after:bg-primary after:-bottom-1 after:left-[50%]"
                  : ""
            }>
            Movies
         </NavLink>
      </header>
   );
};

export default Header;
