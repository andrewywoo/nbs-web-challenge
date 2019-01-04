import React from "react";
import "./SplashPage.css";

const splashPage = props => {
  return (
    <div className="SplashPage">
      <p>
        Welcome to the Artist Metric Quick Search application. This application
        was written using D3.js + React. The data is powered by API provided by
        the Next Big Sound. Please search an artist on the top left to begin
        using the application.
      </p>
    </div>
  );
};

export default splashPage;
