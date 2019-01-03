import React from "react";
import "./Spinner.css";

const spinner = props => {
  return (
    <div style={props.style} className="Loader">
      Loading...
    </div>
  );
};

export default spinner;
