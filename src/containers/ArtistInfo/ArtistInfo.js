import React from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as d3 from "d3";
import "./ArtistInfo.css";

const artistInfo = props => {
  let image = null;
  let name = null;
  let genre = null;
  let content = null;
  let recordLabels = null;
  let monthlyActiveListeners = null;
  let streams = null;
  let formatter = d3.format(",");

  //if search is pending. show loading spinner.
  if (props.isLoaded) {
    content = <Spinner />;
  }

  //when artist info is retrived. load content instead of spinner.
  if (props.artistInfo) {
    image = <img src={props.artistInfo.images[0].original} alt="Artist" />;
    name = <h1>{props.artistInfo.name}</h1>;
    genre = <h2>{props.artistInfo.genres.join(" - ")}</h2>;
    recordLabels = <p>{props.artistInfo.recordLabels.join(" - ")}</p>;
    if (props.artistInfo.pandoraAudience.monthlyActiveListeners) {
      monthlyActiveListeners = (
        <p>
          {formatter(
            props.artistInfo.pandoraAudience.monthlyActiveListeners.total
          )}
        </p>
      );
    }
    if (props.artistInfo.pandoraAudience.streams) {
      streams = (
        <p>{formatter(props.artistInfo.pandoraAudience.streams.total)}</p>
      );
    }

    content = (
      <>
        <div className="ArtistInfo__info-bio">
          <div className="ArtistInfo__info-image">{image}</div>
          <div className="ArtistInfo__info-description">
            {name}
            {genre}
            {recordLabels}
          </div>
        </div>
        <div>
          <section className="ArtistInfo__info-card">
            <h2>Monthly Active Listeners</h2>
            <div>{monthlyActiveListeners}</div>
          </section>
          <section className="ArtistInfo__info-card">
            <h2>Monthly Total Streams</h2>
            <div>{streams}</div>
          </section>
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
