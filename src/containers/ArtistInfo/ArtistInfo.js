import React from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./ArtistInfo.css";

const artistInfo = props => {
  let image = null;
  let info = null;
  let genre = null;
  let content = null;

  //if search is pending. show loading spinner.
  if (props.isLoaded) {
    content = <Spinner />;
  }

  //when artist info is retrived. load content instead of spinner.
  if (props.artistInfo) {
    image = (
      <img height="100" src={props.artistInfo.images[0][100]} alt="Artist" />
    );
    info = <h1>Artist Name: {props.artistInfo.name}</h1>;
    genre = <h2>Genre: {props.artistInfo.genres.join(" ")}</h2>;

    content = (
      <>
        {image}
        <div style={{ textAlign: "center" }}>
          {info}
          {genre}
        </div>
      </>
    );
  }

  return (
    <div id="artistInfo" className="ArtistInfo">
      <div className="ArtistInfo__label">
        <span>Artist Info</span>
      </div>
      <div className="ArtistInfo__info">{content}</div>
    </div>
  );
};

export default artistInfo;
