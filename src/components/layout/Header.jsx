import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
   return (
      <header className="flex items-center justify-center py-10 mb-5 text-white header gap-x-5">
         <NavLink
            to="/"
            className={({ isActive }) =>
               isActive
                  ? "text-primary relative after:absolute after:w-1 after:h-1 after:rounded-full after:bg-primary after:-bottom-1 after:left-[50%]"
                  : ""
            }>
            Trang chủ
         </NavLink>
         <NavLink
            to="/movies"
            className={({ isActive }) =>
               isActive
                  ? "text-primary relative after:absolute after:w-1 after:h-1 after:rounded-full after:bg-primary after:-bottom-1 after:left-[50%]"
                  : ""
            }>
            Phim
         </NavLink>
      </header>
   );
};

export default Header;
