import React from "react";
import PropTypes from "prop-types";

const LoadingSkeleton = (props) => {
   return (
      <div className={
         `skeleton ${props.className}`
      } style={{
         height: props.height,
         width: props.width || "100%",
         borderRadius: props.radius || "0",
      }}></div>
   );
};

LoadingSkeleton.propTypes = {

};

export default LoadingSkeleton;
