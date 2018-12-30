import React from "react";
import "./ArtistInfo.css";

const artistInfo = props => {
  let image,
    info,
    genre = null;
  if (props.artistInfo) {
    image = (
      <img height="100" src={props.artistInfo.images[0][100]} alt="Artist" />
    );
    info = <h1>Artist Name: {props.artistInfo.name}</h1>;
    genre = <h2>Genre: {props.artistInfo.genres.join(" ")}</h2>;
  }

  return (
    <div className="artist-info">
      {image}
      <div style={{ textAlign: "center" }}>
        {info}
        {genre}
      </div>
    </div>
  );
};

export default artistInfo;
