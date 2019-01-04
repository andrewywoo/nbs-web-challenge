import React from "react";
import "./NavigationBar.css";

const navigationBar = props => {
  return (
    <nav className="NavigationBar">
      <div className="NavigationBar__search-bar">
        <input
          id="search"
          className="NavigationBar__input"
          type="text"
          placeholder="Search For An Artist"
          onChange={props.handleArtistChange}
        />
      </div>
      <div className="NavigationBar__links">
        <ul className="NavigationBar__ul">
          <li className="NavigationBar__li">
            <a href="#artistInfo" className="NavigationBar__href">
              Artist Info
            </a>
          </li>
          <li className="NavigationBar__li">
            <a href="#socialMedia" className="NavigationBar__href">
              Social Media
            </a>
          </li>
          <li className="NavigationBar__li">
            <a href="#trackSpins" className="NavigationBar__href">
              Track Spins
            </a>
          </li>
          <li className="NavigationBar__li">
            <a
              href="https://github.com/andrewywoo/"
              className="NavigationBar__href"
            >
              by awoo
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navigationBar;
