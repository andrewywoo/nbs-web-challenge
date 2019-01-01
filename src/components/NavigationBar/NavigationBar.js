import React from "react";
import "./NavigationBar.css";

const navigationBar = props => {
  return (
    <nav className="NavigationBar">
      <div className="NavigationBar__search-bar">
        <input
          id="search"
          className="artistSearchInput"
          type="text"
          placeholder="Search For An Artist"
          onChange={props.handleArtistChange}
        />
      </div>
      <div className="NavigationBar__links">
        <ul className="NavigationBar__ul">
          <li className="NavigationBar__li">
            <a href="#info" className="NavigationBar__href">
              Artist Info
            </a>
          </li>
          <li className="NavigationBar__li">
            <a href="#info" className="NavigationBar__href">
              Social Media
            </a>
          </li>
          <li className="NavigationBar__li">
            <a href="#info" className="NavigationBar__href">
              Track Spins
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navigationBar;
