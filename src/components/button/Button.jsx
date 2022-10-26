import React from "react";

const Button = ({ onClick, className, children, type="button", bgColor="primary", full = false }) => {

   let bgClassName = 'bg-primary';
   switch (bgColor) {
      case 'primary':
         bgClassName = 'bg-primary';
         break;

      default:
         break;
   }
   return (
      <button
         type={type}
         className={`py-3 px-6 rounded-md capitalize mt-auto ${bgClassName} ${className} ${full ? 'w-full' : ''}`}
         onClick={onClick}>
         {children}
      </button>
   );
};

export default Button;
