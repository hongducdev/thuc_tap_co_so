import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
   return (
      <div className="flex items-center justify-center flex-col w-full h-screen overflow-hidden gap-5">
         <h1 className="text-primary font-bold text-[200px] leading-none">
            404
         </h1>
         <p className="text-white text-2xl">
            Page not found
         </p>
         <Link to="/">
            <button className="p-4 bg-primary text-white rounded-lg">
               Go to home
            </button>
         </Link>
      </div>
   );
};

export default PageNotFound;
