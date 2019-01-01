import React from "react";
import "./ArtistInfo.css";

const artistInfo = props => {
  let image = null;
  let info = null;
  let genre = null;

  if (props.artistInfo) {
    image = (
      <img height="100" src={props.artistInfo.images[0][100]} alt="Artist" />
    );
    info = <h1>Artist Name: {props.artistInfo.name}</h1>;
    genre = <h2>Genre: {props.artistInfo.genres.join(" ")}</h2>;
  }

  return (
    <div id="artistInfo" className="ArtistInfo">
      <div className="ArtistInfo__label">
        <span>Artist Info</span>
      </div>
      <div className="ArtistInfo__info">
        {image}
        <div style={{ textAlign: "center" }}>
          {info}
          {genre}
        </div>
      </div>
    </div>
  );
};

export default artistInfo;
